import ENDPOINTS from "../config/api";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}


export interface SignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface MeResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}


async function extractError(res: Response) {
  try {
    const data = await res.clone().json();
    if (data?.message) return String(data.message);
    if (data?.error) return String(data.error);
    return JSON.stringify(data);
  } catch {
    const txt = await res.text().catch(() => '');
    return txt || 'Request failed';
  }
}


export async function login(req: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const baseMsg = await extractError(res);
    let friendly = baseMsg;
    if (res.status === 400 || res.status === 401) {
      friendly = 'Invalid email or password.';
    } else if (res.status >= 500) {
      friendly = 'Server error. Please try again later.';
    }
    throw new Error(friendly);
  }

  return res.json();
}


export async function signup(req: SignupRequest): Promise<void> {
    const res = await fetch(ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || 'Signup failed');
    }
}


export async function getMe(token: string): Promise<MeResponse>{
    const res = await fetch(ENDPOINTS.GET_ME, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error (text || 'Failed to fetch profile');
    }

    return res.json();
}