import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    window.onload = () => {
      window.location.href = "https://cold-dino.vercel.app";  
    }
  }, [])
}
