import config from "../config/index.js";

const BASE_URL = "https://api.sms.net.bd";

/**
 * Generates a random 6-digit OTP.
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Sends an OTP to a specified mobile number via Alpha SMS.
 * @param {string} phoneNumber - Must start with country code (880) or standard 01X.
 * @param {string} otp - The generated OTP code.
 */
export async function sendOTP(phoneNumber, otp) {
  const apiKey = config.alphaSmsApiKey;
  const message = `Your Return Gari verification code is: ${otp}. Do not share this with anyone.`;
  
  console.log(`[SMS OTP SERVICE] Phone: ${phoneNumber}, Generated OTP: ${otp}`);

  // If dummy or key not configured, bypass real SMS and simulate success
  if (!apiKey || apiKey === "dummy_key_until_configured") {
    console.log(`[SMS OTP SERVICE] Bypassing real SMS dispatch (dummy API key)`);
    return { success: true, requestId: "MOCK_REQUEST_ID_" + Date.now(), otp };
  }

  // Format parameters as application/x-www-form-urlencoded
  const payload = new URLSearchParams({
    api_key: apiKey,
    msg: message,
    to: phoneNumber
  });

  try {
    const response = await fetch(`${BASE_URL}/sendsms`, {
      method: "POST",
      body: payload,
    });
    
    const data = await response.json();
    
    // Check if the API returned a success code (0)
    if (data.error === 0) {
      console.log("OTP sent successfully. Request ID:", data.data.request_id);
      return { success: true, requestId: data.data.request_id, otp };
    } else {
      console.error(`Failed to send OTP. Error Code: ${data.error}, Message: ${data.msg}`);
      return { success: false, error: data.error, message: data.msg };
    }
  } catch (error) {
    console.error("Network or server error during SMS dispatch:", error);
    return { success: false, message: "Internal server error" };
  }
}
