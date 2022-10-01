import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { env } from "../../config/config";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${env.api}/register/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <div
          className={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/cyber-wolve/AuthInMern/Email-Verify-In-MERN/client/src/images/success.png"
            alt="success_img"
          />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button
              className={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "#3bb19b",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
