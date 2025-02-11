import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { WelcomePage } from '@/pages/Welcome';
import { HomePage } from '@/pages/Home';
import { AstralPlanePage } from '@/pages/realms/AstralPlane';
import { WixCallbackPage } from '@/pages/auth/callback';

export const routes = (
  <>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/auth/callback" element={<WixCallbackPage />} />
    <Route element={<Layout />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/realms/astral-plane" element={<AstralPlanePage />} />
    </Route>
  </>
);