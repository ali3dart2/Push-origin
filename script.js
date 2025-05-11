document.querySelector('.save-button').addEventListener('click', () => {
    alert('تغییرات ذخیره شد!');
});

// Generate random captcha code
function generateCaptcha() {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captchaCode = '';
    const length = 6; // طول کد امنیتی
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captchaCode += characters[randomIndex];
    }
    
    const captchaElement = document.getElementById('captcha-code');
    if (captchaElement) {
        captchaElement.textContent = captchaCode;
    }
}

// Generate captcha on page load
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
    
    // اضافه کردن قابلیت کلیک برای دکمه رفرش
    const refreshButton = document.getElementById('refresh-captcha');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            generateCaptcha();
        });
    }
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const captchaInput = document.getElementById('captcha').value;
            const captchaCode = document.getElementById('captcha-code').textContent;
            
            if (captchaInput === captchaCode) {
                alert('پیام شما با موفقیت ارسال شد.');
                this.reset();
                generateCaptcha();
            } else {
                alert('کد امنیتی اشتباه است. لطفا دوباره تلاش کنید.');
                generateCaptcha();
            }
        });
    }

    // Handle registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            
            // Validate form
            let isValid = true;
            
            if (username.length < 3) {
                document.getElementById('username-error').textContent = 'نام کاربری باید حداقل 3 کاراکتر باشد';
                document.getElementById('username-error').style.display = 'block';
                isValid = false;
            }
            
            if (password.length < 6) {
                document.getElementById('password-error').textContent = 'رمز عبور باید حداقل 6 کاراکتر باشد';
                document.getElementById('password-error').style.display = 'block';
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'رمز عبور و تکرار آن مطابقت ندارند';
                document.getElementById('confirm-password-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Save user data to localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if username already exists
                if (users.some(user => user.username === username)) {
                    document.getElementById('username-error').textContent = 'این نام کاربری قبلاً ثبت شده است';
                    document.getElementById('username-error').style.display = 'block';
                    return;
                }
                
                // Add new user
                users.push({
                    username: username,
                    password: password // در حالت واقعی باید رمز عبور را هش کنید
                });
                
                localStorage.setItem('users', JSON.stringify(users));
                
                alert('ثبت‌نام با موفقیت انجام شد!');
                window.location.href = 'login.html';
            }
        });
    }

    // Add default user
    const defaultUser = {
        username: 'alirakhshani3dart',
        password: '۱۲۳۴'
    };

    // Initialize users in localStorage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([defaultUser]));
    }

    // Handle login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Save logged in user
            localStorage.setItem('currentUser', JSON.stringify({ username: username }));
            localStorage.setItem('showWelcome', 'true');
            
            // Redirect to index page
            window.location.href = 'index.html';
        });
    }

    // Handle signature form
    const signatureForm = document.getElementById('signature-form');
    const nameInput = document.getElementById('name');
    const signaturePreview = document.getElementById('signature-preview');
    
    if (signatureForm && nameInput && signaturePreview) {
        // نمایش پیش‌نمایش امضا با تغییر نام
        nameInput.addEventListener('input', function() {
            signaturePreview.textContent = this.value;
        });
        
        // مدیریت ارسال فرم
        signatureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = nameInput.value;
            const password = document.getElementById('password').value;
            
            if (name && password) {
                alert('امضای شما با موفقیت ثبت شد!');
                window.location.href = 'index.html';
            } else {
                alert('لطفا نام و رمز عبور را وارد کنید.');
            }
        });
    }

    // Show welcome message on index page
    const showWelcome = localStorage.getItem('showWelcome');
    if (showWelcome === 'true') {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'welcome-message';
            welcomeMessage.innerHTML = `
                <div class="welcome-container">
                    <div class="welcome-icon">👋</div>
                    <h3 class="welcome-title">به وب‌سایت گرافیست و انیماتور علی خوش آمدید!</h3>
                    <p class="welcome-text">شما با موفقیت وارد حساب کاربری خود شدید.</p>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .welcome-message {
                    background: linear-gradient(135deg, #2196F3, #1976D2);
                    color: white;
                    padding: 30px;
                    border-radius: 15px;
                    margin: 30px 0;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    animation: fadeInUp 0.8s ease-out;
                    position: relative;
                    overflow: hidden;
                }
                
                .welcome-message::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
                    pointer-events: none;
                }
                
                .welcome-container {
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }
                
                .welcome-icon {
                    font-size: 48px;
                    margin-bottom: 15px;
                    animation: wave 2s infinite;
                }
                
                .welcome-title {
                    font-size: 28px;
                    margin-bottom: 15px;
                    font-weight: bold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                }
                
                .welcome-text {
                    font-size: 18px;
                    opacity: 0.9;
                    line-height: 1.6;
                }
                
                @keyframes fadeInUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
            `;
            document.head.appendChild(style);
            
            homeSection.insertBefore(welcomeMessage, homeSection.firstChild);
            
            // Remove the flag after showing the message
            localStorage.removeItem('showWelcome');
        }
    }
    
    // Update auth menu
    const authMenu = document.querySelector('.auth-menu');
    if (authMenu) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            authMenu.innerHTML = `
                <span>خوش آمدید، ${currentUser.username}</span>
                <span class="separator">|</span>
                <a href="#" id="logout">خروج</a>
            `;
            
            // Add logout handler
            document.getElementById('logout').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        } else {
            authMenu.innerHTML = `
                <a href="login.html">ورود</a>
                <span class="separator">|</span>
                <a href="register.html">ثبت‌نام</a>
            `;
        }
    }
});

{
    "name": "my-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "http-server"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "http-server": "^14.1.1"
    }
  }
  