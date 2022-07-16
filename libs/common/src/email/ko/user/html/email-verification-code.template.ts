export const koEmailVerificationCodeTemplate = (code: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <!-- import font -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Damion&family=Montserrat:wght@400;500;600&display=swap');
    </style>
    <style>
      :root {
        --color-lightblue: #A7DAF6;
        --color-lightblue2: #E5F9FF;
        --color-navy-nightsky: #0D1648;
      }
​
      body {
        position: relative;
        width: 100vw;
        display: flex;
        flex-direction: column;
        margin: 0;
        overflow: hidden;
      }
​
      .align-center {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
​
      .banner {
        font-family: 'Damion';
        width: 100%;
        line-height: 1.37;
        background: radial-gradient(166.91% 75.37% at 49.87% 50%, #272F5C 0%, #13132D 55.21%, #08070F 100%);
      }
​
      header {
        height: 7rem;
        font-size: 2.25rem;
        color: var(--color-lightblue2);
      }
​
      footer {
        height: 7.5rem;
        font-size: 1.5rem;
        color: var(--color-lightblue);
      }
​
      main {
        flex-direction: column;
        flex-grow: 1;
        font-family: 'Montserrat';
        padding-top: 3rem;
        padding-bottom: 4.875rem;
      }
​
      #message {
        font-size: 0.875rem;
        font-weight: 400;
        text-align: center;
        margin-bottom: 3.5rem;
      }
​
      #verification-code {
        width: 16rem;
        height: 6.125rem;
        font-size: 1.75rem;
        font-weight: 500;
        letter-spacing: 0.24em;
        color: black;
        background-color: var(--color-lightblue2);
        border-radius: 1.25rem;
        margin-bottom: 3.125rem;
      }
​
      #btn-copy {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-lightblue);
        border: 1.5px solid var(--color-lightblue);
        border-radius: 0.5rem;
        background-color: transparent;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
      }
​
      #btn-copy:hover {
        color: var(--color-navy-nightsky);
        border-color: var(--color-lightblue);
        background-color: var(--color-lightblue);
      }
​
      #toast {
        position: absolute;
        width: 100%;
        bottom: 8.5rem;
        opacity: 0;
        transition: opacity 500ms ease-in-out;
      }
​
      #toast.show {
        opacity: 1;
      }
​
      #toast p {
        font-family: 'Montserrat';
        font-size: 0.875rem;
        color: var(--color-lightblue2);
        text-align: center;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 1rem;
        padding: 1rem 2rem;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <header class="banner align-center">loeyB</header>
    
    <main class="align-center">
      <div id="message">
        Hi, welcome to loeyB!
        <br />
        <br />
        ${code}
      </div>
      <button id="btn-copy" onclick="onCopy()">
        copy code
      </button>
​<!--
      <div id="verification-code" class="align-center">
        34529
      </div>
​-->  
    </main>
​
    <footer class="banner align-center">explore your universe</footer>
​
    <div id="toast" class="align-center">
      <p></p>
    </div>
​
    <script type="text/javascript">
      function showToast(message) {
        const toastElement = document.getElementById('toast');
        toastElement.getElementsByTagName('p')[0].innerText = message;
        toastElement.classList.add('show');
        
        window.setTimeout(function() {
          toastElement.classList.remove('show');
        }, 2500);
      }
​
      function onCopy() {
        const vericationCode = document.getElementById('verification-code').innerText;
        navigator.clipboard.writeText(vericationCode);
        showToast('Copied Verification Code!');
      }
    </script>
  </body>
</html>
`;
