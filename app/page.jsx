"use client"
import React from 'react'
import { useCustomAuth } from '@/store/useCustomAuthHook';

export default function Home() {

    const user = useCustomAuth('/')

    return (
      <>
      
      </>
    );
}
