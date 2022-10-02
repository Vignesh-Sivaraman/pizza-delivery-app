import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { env } from "../../config/config";

const PasswordVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${env.api}/forpass/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        console.error(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <div
          style={{
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
          <h1>Click the below button to reset Your password</h1>
          <Link to="/resetpass">
            <button
              className="btn btn-sucess"
              style={{
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
              Reset password
            </button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default PasswordVerify;
