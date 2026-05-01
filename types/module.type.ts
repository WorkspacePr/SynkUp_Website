export interface Module {
    id: string;
    name: string;
    description: string;
    category: string;
    type: "core" | "add-on" | "plan-based";
    availability: string; // e.g. "All", "Professional+"
    status: "active" | "disabled" | "limited";
    version: string;
    last_updated: string;

    plans: {
        starter: { enabled: boolean; mode: "full" | "limited" };
        professional: { enabled: boolean; mode: "full" | "limited" };
        enterprise: { enabled: boolean; mode: "full" | "limited" };
    };

    dependencies: string[];
    used_by: string[];
    settings?: Record<string, any>;
}