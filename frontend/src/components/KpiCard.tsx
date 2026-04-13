import { Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

export const KpiCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) => {
  return (
    <Card className="enter-animated" sx={{ border: "1px solid #dbe8ff", height: "100%" }}>
      <CardContent>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748b", mb: 1 }}>
          {icon}
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};
