import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pay-level")({
  component: () => <Outlet />,
});
