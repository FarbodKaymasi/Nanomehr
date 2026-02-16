// CMS Configuration and Helpers

export const CMS_CONFIG = {
  // API Base URL
  getBaseUrl: (projectId: string) => 
    `https://${projectId}.supabase.co/functions/v1/make-server-008a3150`,
  
  // Endpoints
  endpoints: {
    signup: '/auth/signup',
    signin: '/auth/signin',
    me: '/auth/me',
    content: '/cms/content',
    contentSection: (section: string) => `/cms/content/${section}`,
    initialize: '/cms/initialize',
    blog: '/cms/blog',
    blogPost: (id: string) => `/cms/blog/${id}`
  },

  // Section names
  sections: {
    HERO: 'hero',
    STATS: 'stats',
    SERVICES: 'services',
    PRODUCTS: 'products',
    ABOUT: 'about',
    CUSTOMERS: 'customers',
    CONTACT: 'contact',
    FOOTER: 'footer',
    SETTINGS: 'settings'
  },

  // Storage keys
  storageKeys: {
    TOKEN: 'cms_token',
    USER: 'cms_user'
  }
};

// Helper functions for CMS API calls
export class CMSApi {
  private baseUrl: string;
  private anonKey: string;

  constructor(projectId: string, anonKey: string) {
    this.baseUrl = CMS_CONFIG.getBaseUrl(projectId);
    this.anonKey = anonKey;
  }

  // Authentication
  async signup(email: string, password: string, name: string) {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.signup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.anonKey}`
      },
      body: JSON.stringify({ email, password, name })
    });
    return response.json();
  }

  async signin(email: string, password: string) {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.signin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.anonKey}`
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async getMe(token: string) {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.me, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  // Content
  async getAllContent() {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.content, {
      headers: {
        'Authorization': `Bearer ${this.anonKey}`
      }
    });
    return response.json();
  }

  async getSection(section: string) {
    const response = await fetch(
      this.baseUrl + CMS_CONFIG.endpoints.contentSection(section),
      {
        headers: {
          'Authorization': `Bearer ${this.anonKey}`
        }
      }
    );
    return response.json();
  }

  async updateSection(section: string, content: any, token: string) {
    const response = await fetch(
      this.baseUrl + CMS_CONFIG.endpoints.contentSection(section),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      }
    );
    return response.json();
  }

  async initialize(token: string) {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.initialize, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  // Blog
  async getBlogPosts() {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.blog, {
      headers: {
        'Authorization': `Bearer ${this.anonKey}`
      }
    });
    return response.json();
  }

  async getBlogPost(id: string) {
    const response = await fetch(
      this.baseUrl + CMS_CONFIG.endpoints.blogPost(id),
      {
        headers: {
          'Authorization': `Bearer ${this.anonKey}`
        }
      }
    );
    return response.json();
  }

  async createBlogPost(post: any, token: string) {
    const response = await fetch(this.baseUrl + CMS_CONFIG.endpoints.blog, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });
    return response.json();
  }

  async updateBlogPost(id: string, post: any, token: string) {
    const response = await fetch(
      this.baseUrl + CMS_CONFIG.endpoints.blogPost(id),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
      }
    );
    return response.json();
  }

  async deleteBlogPost(id: string, token: string) {
    const response = await fetch(
      this.baseUrl + CMS_CONFIG.endpoints.blogPost(id),
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.json();
  }
}

// Local storage helpers
export const CMSStorage = {
  saveToken(token: string) {
    localStorage.setItem(CMS_CONFIG.storageKeys.TOKEN, token);
  },

  getToken(): string | null {
    return localStorage.getItem(CMS_CONFIG.storageKeys.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(CMS_CONFIG.storageKeys.TOKEN);
  },

  saveUser(user: any) {
    localStorage.setItem(CMS_CONFIG.storageKeys.USER, JSON.stringify(user));
  },

  getUser(): any | null {
    const user = localStorage.getItem(CMS_CONFIG.storageKeys.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(CMS_CONFIG.storageKeys.USER);
  },

  clear() {
    this.removeToken();
    this.removeUser();
  }
};
