import { SectionHeading } from "~/components/common/section-heading";
import { CreateGardenButton } from "~/components/garden/create-garden-button";
import { MyGardens } from "~/components/garden/my-gardens";

export default function GardensPage() {
  return (
    <div className="">
      <SectionHeading
        title="My Gardens"
        description="Manage your gardens and growing spaces"
        actions={<CreateGardenButton />}
      />
      <div className="mt-6">
        <MyGardens />
      </div>
    </div>
  );
}
