import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

function StatusFilter() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label htmlFor="status">Status</Label>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="membershipUN" className="size-5" defaultChecked />
          <Label htmlFor="membershipUN">Member of the United Nations</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="membershipIndependent"
            className="size-5"
            defaultChecked
          />
          <Label htmlFor="membershipIndependent">Independent</Label>
        </div>
      </div>
    </div>
  );
}

export default StatusFilter;
