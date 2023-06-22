// Libs
import React from "react";

// UI
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const BreadcrumbsUI = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter(Boolean);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Início
      </Link>

      {pathnames.map((path, index) => {
        const pathname = path.charAt(0).toUpperCase() + path.slice(1);

        return index === pathnames.length - 1 ? (
          <Typography key={path} color="text.primary">
            {pathname}
          </Typography>
        ) : (
          <Link key={path} underline="hover" color="inherit" href={`/${path}`}>
            {pathname}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
