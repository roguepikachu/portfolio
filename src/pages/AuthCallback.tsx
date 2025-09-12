import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { LoadingDots } from "@/components/ui/LoadingDots";
import styles from './AuthCallback.module.css';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Redirect to home page after successful authentication
        navigate("/");
      } catch (error) {
        console.error("Error handling auth callback:", error);
        navigate("/");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <LoadingDots />
    </div>
  );
} 