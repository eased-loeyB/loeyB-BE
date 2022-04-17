export const enEmailVerificationCodeTemplate = (
  code: string,
  url: string,
): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Email Verification Code</title>
  </head>
  <body style="margin: 0; box-sizing: border-box">
    <div
      style="
        padding: 54px;
        width: 726px;
        height: auto;
        box-sizing: border-box;
        margin: 0px auto;
      "
    >
      <div id="header" style="cursor: pointer">
        <a href="${url}">
          <img
            id="logo_primary"
            src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/eba94286-a00e-fae3-eddb-78d8f6bb1b6c.png"
            style="width: 76px; height: 20px"
            alt="CAPA"
          />
        </a>
      </div>

      <div>
        <p
          style="
            font-weight: 700;
            font-size: 32px;
            line-height: 48px;
            letter-spacing: -0.1px;
          "
        >
          Email Verification
        </p>
      </div>

      <div id="subtitle" style="margin-bottom: 54px">
        <p
          style="
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.1px;
            margin: 0px;
          "
        >
          We are greateful for your visit.
        </p>
        <p
          style="
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.1px;
            margin: 0px;
          "
        >
          Please input following verification code.
        </p>
      </div>
      <div
        id="certificated_number"
        style="background-color: #f5f5f5; height: 108px; margin-bottom: 54px"
      >
        <span
          style="
            display: block;
            font-size: 40px;
            font-weight: 700;
            line-height: 64px;
            letter-spacing: -0.1px;
            color: #3479ff;
            text-align: center;
            padding: 24px;
          "
        >
          ${code}
        </span>
      </div>

      <div
        id="divider"
        style="height: 1px; background: #dee2e6; width: 100%"
      ></div>

      <div id="footer" style="padding-top: 48px; position: relative">
        <a
          href="${url}"
          style="display: flex; width: 76px; height: 20px; margin-bottom: 24px"
        >
          <img
            id="logo_secondary"
            src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/0433e375-f56c-5e71-9b0d-04b3474b8abd.png"
            style="
              width: 76px;
              height: 20px;
              cursor: pointer;
              margin-bottom: 24px;
            "
            alt="CAPA"
          />
        </a>

        <p
          id="capa_email"
          style="
            font-size: 14px;
            font-weight: 400;
            line-height: 20.02px;
            letter-spacing: -0.1px;
            color: #adb5bd;
            margin: 0px;
          "
        >
          As it is outgoing email,<br />
          if you have further question, please inquire to support@capa.ai
        </p>
        <p
          id="capa_phone_address"
          style="
            font-size: 14px;
            font-weight: 400;
            line-height: 20.02px;
            letter-spacing: -0.1px;
            color: #adb5bd;
            margin: 32px 0px 0px;
          "
        >
          Contact Number : 02-545-6332<br />
          Business Hours : 10AM - 6PM for a weekday (1PM - 2PM for lunch hour)<br />
          Address : 3rd floor jungwon building, jamwondong,  Narutero 60, Sucho-gu, Seoul
        </p>

        <a
          href="https://www.instagram.com/capakr"
          style="
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 50%;
            position: absolute;
            right: 66px;
            bottom: 0px;
            cursor: pointer;
          "
        >
          <img
            src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/49d0ba1a-7607-3ebb-21e1-12126c72fe3b.png"
            alt="instagram"
            style="width: 45px; height: 45px"
          />
        </a>

        <a
          href="https://www.facebook.com/capakr"
          style="
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 50%;
            position: absolute;
            right: 0px;
            bottom: 0px;
            cursor: pointer;
          "
        >
          <img
            src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/33979805-97e6-ad49-6cd2-1b82fd67503b.png"
            alt="facebook"
            style="width: 45px; height: 45px"
          />
        </a>
      </div>
    </div>
  </body>
</html>`;
