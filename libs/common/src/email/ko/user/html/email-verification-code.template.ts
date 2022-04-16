export const koEmailVerificationCodeTemplate = (
  code: string,
  capaUrl: string,
  expireTime: string,
): string => `
<!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>파트너 메세지 도착</title>
    </head>
    <body>
      
      <table border="0" style="width: 726px; padding: 54px;">
  <!--       header-->
          <tr style="height: 24px" >
              <td style="padding: 0;" colspan="2">
                <div id="header">
                  <a href="${capaUrl}">
                    <img
                      id="logo_primary"
                      src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/eba94286-a00e-fae3-eddb-78d8f6bb1b6c.png"
                      style="width: 91px; height: 24px"
                      alt="CAPA"
                    />
                  </a>
                </div>
              </td>
          </tr>
          <tr style="height: 36px"></tr>
  <!--content-->
          <tr style="height: 48px">
              <td colspan="2">
                  <div style="font-size: 32px; margin: 0; font-weight: 700; line-height: 48px">이메일 인증</div>
              </td>
          </tr>
          <tr style="height: 32px">
          </tr>
          <tr style="height: 48px">
             <td colspan="2">
              <p style="margin: 0; line-height: 24px; font-size: 16px">카파 서비스를 이용해주셔서 감사합니다 <br>
가입 화면에서 아래 인증번호를 입력해주세요</p></td>
          </tr>
          <tr style="height: 54px"></tr>
         <tr style="height: 108px; background-color: #F5F5F5">
             <td colspan="2">
                 <p style="font-size: 40px; margin: 0; line-height: 64px; text-align: center; color: #4B88FF; font-weight: 700; letter-spacing: 12px">${code}</p>
             </td>
         </tr>
         <tr style="height: 54px"></tr>
         <tr style="height: 48px;">
             <td colspan="2">
                 <p style="font-size: 16px; margin: 0">인증 시간이 만료된 경우, 인증을 다시 진행해주세요 <br>
이메일 인증 만료일시 : ${expireTime}</p>
             </td>
         </tr>
  <!--   footer    -->
         <tr style="height: 6px"></tr>
          <tr style="height: 96px">
              <td colspan="2">
                  <div style="border-top:1px solid #DEE2E6;"></div>
              </td>
          </tr>
   <tr style="height: 24px">
              <td colspan="2">
                  <a href="${capaUrl}">
                    <img
                      id="logo_primary"
                      src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/0433e375-f56c-5e71-9b0d-04b3474b8abd.png"
                      style="width: 91px; height: 24px"
                      alt="CAPA"
                    />
                  </a>
                </td>
          </tr>
          <tr style="height: 20px"></tr>
          <tr style="height: 40px">
              <td colspan="2">
                  <div>
                      <p style="white-space: nowrap; font-size: 14px; color: #ADB5BD;margin:0;line-height: 20px">
                      본 메일은 발신 전용 메일입니다. <br>
                      문의 사항은 <a style="color: #868E96" href="mailto:support@capa.ai">support@capa.ai</a>로 메일을 보내주세요.
                      </p>
                  </div>
              </td>
          </tr>
          <tr style="height: 20px;"></tr>
          <tr>
              <td>
                     <div style="width: 100%; float: left;">
                      <p style="white-space: nowrap;font-size: 14px; color: #ADB5BD; line-height: 20px; margin: 0;">
                          전화: 02-545-6332 <br>
                          영업시간: 평일 오전 10시 - 오후 6시(점심시간 1-2시) <br>
                          주소: 서울특별시 서초구 나루터로 60, 3층 (잠원동 정원빌딩) 
                      </p>
                       </div>
              </td>
              <td>
            <div
              style="
                height: 45px;
                float: right;
              "
            >
              <a
                href="https://www.instagram.com/capakr"
                style="
                  width: 45px;
                  height: 45px;
                  text-decoration: none;
                "
              >
                <img
                  src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/011f131b-c008-63a0-9d07-01bcac66f6db.png"
                  alt="instagram"
                  style="width: 45px; height: 45px"
                />
              </a>
              <a
                href="https://www.facebook.com/capakr"
                style="
                  width: 45px;
                  height: 45px;
                  margin: 0 12px 0 12px;
                  text-decoration: none;
                "
              >
                <img
                  src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/6c2c1a9e-37f9-9787-32fa-daba8ef5f413.png"
                  alt="facebook"
                  style="width: 45px; height: 45px"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/ateamventures-capa/mycompany/"
                style="
                  width: 45px;
                  height: 45px;
                  text-decoration: none;
                "
              >
                <img
                  src="https://mcusercontent.com/aa9c2a71564675cfe7d54e145/images/466f9169-a7bf-2fd5-2a4d-02fcac9abf27.png"
                  alt="linkedin"
                  style="width: 45px; height: 45px;"
                />
              </a>
            </div>
              </td> 
          </tr>
      </table>
    </body>
  </html>
`;
