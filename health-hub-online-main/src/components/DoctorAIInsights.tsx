import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: number;
  reviews: number;
  qualifications?: string[];
  location: string;
  fee?: string;
}

interface DoctorAIInsightsProps {
  doctor: Doctor;
}

const DoctorAIInsights = ({ doctor }: DoctorAIInsightsProps) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("doctor-ai-insights", {
        body: { doctor }
      });

      if (fnError) {
        throw fnError;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setInsights(data.insights);
    } catch (err) {
      console.error("Error fetching AI insights:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to get AI insights";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-premium p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Insights
        </h2>
        {!insights && !isLoading && (
          <Button 
            onClick={fetchInsights} 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Insights
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Analyzing doctor profile...</p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-xl text-destructive">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Unable to generate insights</p>
            <p className="text-sm opacity-80">{error}</p>
            <Button 
              onClick={fetchInsights} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {insights && !isLoading && (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {insights.split('\n').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="leading-relaxed mb-3">
                  {paragraph}
                </p>
              )
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-generated insights based on doctor profile
            </p>
          </div>
        </div>
      )}

      {!insights && !isLoading && !error && (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Click "Generate Insights" to get AI-powered analysis</p>
          <p className="text-xs mt-1 opacity-70">Learn why this doctor might be right for you</p>
        </div>
      )}
    </div>
  );
};

export default DoctorAIInsights;
