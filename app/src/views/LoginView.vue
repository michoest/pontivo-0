<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const email = ref('demo@pontivo.io')
const password = ref('demo')
const rememberMe = ref(false)
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const result = authStore.login(email.value, password.value)
  
  if (result.success) {
    toast.add({ 
      severity: 'success', 
      summary: 'Welcome back!', 
      detail: 'Successfully logged in',
      life: 3000 
    })
    router.push('/app/dashboard')
  } else {
    toast.add({ 
      severity: 'error', 
      summary: 'Login failed', 
      detail: result.error,
      life: 5000 
    })
  }
  
  loading.value = false
}
</script>

<template>
  <div class="login-page">
    <!-- Background Pattern -->
    <div class="login-background">
      <div class="bg-grid"></div>
      <div class="bg-gradient"></div>
    </div>

    <!-- Login Container -->
    <div class="login-container">
      <!-- Left Panel - Branding -->
      <div class="login-branding">
        <div class="branding-content">
          <div class="brand-logo">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="white"/>
              <path d="M8 16C8 11.582 11.582 8 16 8V8C20.418 8 24 11.582 24 16V24H16C11.582 24 8 20.418 8 16V16Z" fill="#2563eb" fill-opacity="0.9"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          </div>
          <h1 class="brand-title">Pontivo</h1>
          <p class="brand-tagline">Your AI-powered consulting platform</p>
          
          <div class="brand-features">
            <div class="feature-item">
              <i class="pi pi-check-circle"></i>
              <span>AI Strategy Consultants</span>
            </div>
            <div class="feature-item">
              <i class="pi pi-check-circle"></i>
              <span>Project Management</span>
            </div>
            <div class="feature-item">
              <i class="pi pi-check-circle"></i>
              <span>Real-time Collaboration</span>
            </div>
            <div class="feature-item">
              <i class="pi pi-check-circle"></i>
              <span>Document Intelligence</span>
            </div>
          </div>

          <div class="brand-personas">
            <div class="persona-preview felix">
              <div class="persona-icon">
                <i class="pi pi-compass"></i>
              </div>
              <div class="persona-info">
                <div class="persona-name">Felix</div>
                <div class="persona-role">Strategy</div>
              </div>
            </div>
            <div class="persona-preview sophie">
              <div class="persona-icon">
                <i class="pi pi-users"></i>
              </div>
              <div class="persona-info">
                <div class="persona-name">Sophie</div>
                <div class="persona-role">Project Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Login Form -->
      <div class="login-form-panel">
        <div class="login-form-container">
          <div class="form-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email">Email address</label>
              <InputText 
                id="email"
                v-model="email" 
                type="email"
                placeholder="Enter your email"
                class="w-full"
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <Password 
                id="password"
                v-model="password"
                placeholder="Enter your password"
                :feedback="false"
                toggleMask
                class="w-full"
                inputClass="w-full"
              />
            </div>

            <div class="form-options">
              <div class="remember-me">
                <Checkbox v-model="rememberMe" :binary="true" inputId="remember" />
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <Button 
              type="submit"
              label="Sign in"
              :loading="loading"
              class="login-button"
            />
          </form>

          <div class="demo-credentials">
            <div class="demo-header">
              <i class="pi pi-info-circle"></i>
              <span>Demo Credentials</span>
            </div>
            <div class="demo-content">
              <code>demo@pontivo.io</code> / <code>demo</code>
            </div>
          </div>

          <div class="login-footer">
            <p>Don't have an account? <a href="#">Contact Sales</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  position: relative;
  overflow: hidden;
}

/* Background */
.login-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(var(--color-border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-light) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top right, rgba(37, 99, 235, 0.08), transparent 50%),
              radial-gradient(ellipse at bottom left, rgba(245, 158, 11, 0.05), transparent 50%);
}

/* Container */
.login-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 640px;
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: var(--spacing-xl);
}

/* Left Branding Panel */
.login-branding {
  flex: 1;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-branding::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.branding-content {
  position: relative;
  z-index: 1;
  color: white;
}

.brand-logo {
  margin-bottom: var(--spacing-lg);
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: var(--spacing-2xl);
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: 0.9375rem;
}

.feature-item i {
  font-size: 1rem;
  opacity: 0.9;
}

.brand-personas {
  display: flex;
  gap: var(--spacing-md);
}

.persona-preview {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.persona-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.persona-preview.felix .persona-icon {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.persona-preview.sophie .persona-icon {
  background: linear-gradient(135deg, #fcd34d, #f59e0b);
}

.persona-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.persona-role {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* Right Form Panel */
.login-form-panel {
  flex: 1;
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 100%;
  max-width: 380px;
}

.form-header {
  margin-bottom: var(--spacing-xl);
}

.form-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.form-header p {
  color: var(--color-text-secondary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.w-full {
  width: 100%;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.remember-me label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.forgot-link {
  font-size: 0.875rem;
  color: var(--color-brand-primary);
  font-weight: 500;
}

.login-button {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: var(--spacing-sm);
}

.demo-credentials {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.demo-header i {
  color: var(--color-brand-primary);
}

.demo-content {
  font-size: 0.875rem;
}

.demo-content code {
  background: var(--color-bg-primary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.login-footer {
  margin-top: var(--spacing-xl);
  text-align: center;
}

.login-footer p {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
}

.login-footer a {
  color: var(--color-brand-primary);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 900px) {
  .login-container {
    flex-direction: column;
    max-width: 480px;
  }
  
  .login-branding {
    padding: var(--spacing-xl);
  }
  
  .brand-title {
    font-size: 1.75rem;
  }
  
  .brand-features {
    display: none;
  }
}
</style>
