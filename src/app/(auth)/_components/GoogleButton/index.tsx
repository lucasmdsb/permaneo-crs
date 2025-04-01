'use client';

import { useEffect, useState } from 'react';

interface SignInGoogleProps {
  context: 'signin' | 'signup';
}

export function GoogleButton(data: SignInGoogleProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <></>;
  }

  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-context={data.context}
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
      <div
        style={{ display: 'none' }}
        id="g_id_onload"
        data-client_id="YOUR_GOOGLE_CLIENT_ID"
        data-login_uri="https://your.domain/your_login_endpoint"
        data-auto_prompt="false"
      ></div>
    </>
  );
}
