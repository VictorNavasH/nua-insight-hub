
// Simplified version
export const toast = ({
  title,
  description,
  variant = "default",
}: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) => {
  // This is a simple implementation
  console.log(`Toast: ${title} - ${description} [${variant}]`);
}
