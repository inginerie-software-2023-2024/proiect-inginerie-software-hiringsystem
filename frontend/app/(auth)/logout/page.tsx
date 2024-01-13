"use client"

import GenericLoading from '@/components/loading/GenericLoading'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Logout = () => {
  const router = useRouter();
  const {logout} = useAuth();

  useEffect(() => {
    logout().then(() => {
        router.push("/");
        router.refresh();
    });
  }, []);

  return (
    <GenericLoading />
  )
}

export default Logout