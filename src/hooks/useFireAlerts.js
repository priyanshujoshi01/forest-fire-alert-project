// src/hooks/useFireAlerts.js
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

export const useFireAlerts = () => {
  const [fireAlerts, setFireAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFireAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("fire_alerts").select("*");
      if (error) throw error;
      setFireAlerts(data);
    } catch (error) {
      console.log("Error fetching fire alerts:", error);
      setFireAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFireAlerts();
  }, []);

  return { fireAlerts, loading, fetchFireAlerts };
};
