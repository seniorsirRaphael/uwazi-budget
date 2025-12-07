import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Send,
  AlertTriangle,
  X,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const REPORT_CATEGORIES = [
  { id: "no-progress", label: "No Progress", description: "Project site shows no activity" },
  { id: "poor-quality", label: "Poor Quality", description: "Work quality below standards" },
  { id: "ghost-workers", label: "Ghost Workers", description: "Suspected fake employee records" },
  { id: "overpricing", label: "Overpricing", description: "Materials or services overcharged" },
  { id: "abandoned", label: "Abandoned Project", description: "Work stopped unexpectedly" },
  { id: "other", label: "Other", description: "Different issue not listed above" },
];

const COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos",
  "Uasin Gishu", "Kakamega", "Kilifi", "Bungoma",
];

export default function ReportIssue() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    county: "",
    projectName: "",
    location: "",
    description: "",
    images: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Simulate image upload
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5),
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Report Submitted Successfully",
      description: "Your report has been received and will be reviewed within 48 hours.",
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">
            Report Submitted!
          </h2>
          <p className="text-muted-foreground mb-2">
            Thank you for helping improve transparency.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Report Reference: <span className="font-mono font-semibold text-foreground">RPT-2024-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
            <ol className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">1</span>
                Your report will be reviewed by our team within 48 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center flex-shrink-0">2</span>
                We may contact you for additional information
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center flex-shrink-0">3</span>
                Verified issues will be escalated to relevant authorities
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center flex-shrink-0">4</span>
                You'll receive status updates on your report
              </li>
            </ol>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="kenya" onClick={() => setSubmitted(false)}>
              Submit Another Report
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-full text-sm font-medium mb-4">
          <AlertTriangle className="w-4 h-4" />
          Citizen Verification Portal
        </div>
        <h1 className="font-display font-bold text-3xl text-foreground">
          See Something? Say Something!
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Help us maintain budget transparency. Report discrepancies you observe in government projects.
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6"
      >
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Report Category *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {REPORT_CATEGORIES.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.category === category.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <p className="font-medium text-foreground">{category.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              County *
            </label>
            <select
              value={formData.county}
              onChange={(e) => setFormData(prev => ({ ...prev, county: e.target.value }))}
              required
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select county</option>
              {COUNTIES.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Specific Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Junction of Moi Ave and Kenyatta"
                className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Project Name (if known)
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
            placeholder="e.g., Kisumu Health Center Construction"
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Describe the Issue *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={4}
            placeholder="Please describe what you observed. Include specific details like dates, times, and any relevant context..."
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Upload Photos (up to 5)
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
            </label>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Upload ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Anonymous Note */}
        <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Your privacy is protected</p>
            <p className="text-xs text-muted-foreground mt-1">
              Reports can be submitted anonymously. We only collect information necessary to investigate the issue.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="kenya"
            size="lg"
            className="flex-1 gap-2"
            disabled={isSubmitting || !formData.category || !formData.county || !formData.description}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Report
              </>
            )}
          </Button>
        </div>
      </motion.form>

      {/* Recent Reports */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-4">
          Recent Community Reports
        </h3>
        <div className="space-y-3">
          {[
            { id: "RPT-5678", category: "No Progress", county: "Nakuru", status: "Under Review", date: "2 days ago" },
            { id: "RPT-5677", category: "Poor Quality", county: "Mombasa", status: "Verified", date: "3 days ago" },
            { id: "RPT-5676", category: "Overpricing", county: "Nairobi", status: "Action Taken", date: "5 days ago" },
          ].map(report => (
            <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-mono text-sm text-foreground">{report.id}</p>
                <p className="text-xs text-muted-foreground">{report.category} • {report.county}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  report.status === "Verified" ? "bg-success/10 text-success" :
                  report.status === "Action Taken" ? "bg-primary/10 text-primary" :
                  "bg-warning/10 text-warning"
                }`}>
                  {report.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
