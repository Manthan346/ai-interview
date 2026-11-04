import { Wifi } from "lucide-react";

// Test the SetupStep component with explicit typing
function SetupStep({ Icon, label, status }: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; status: "pending" | "current" | "complete" }) {
  return (
    <div>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      <span>{status}</span>
    </div>
  );
}

// This should work without errors
const testElement = <SetupStep Icon={Wifi} label="Test" status="complete" />;

export default testElement;