"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

function formatSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function DashboardBreadcrumb() {
  const pathname = usePathname()
  const path = pathname.split("/").filter(Boolean)

  if (path.length === 0) {
    return null
  }

  const breadcrumbItems = path.length > 1 ? path : ["dashboard"]

  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center gap-1.5">
          {breadcrumbItems.map((item, index) => {
            const href = "/" + breadcrumbItems.slice(0, index + 1).join("/")
            const isLast = index === breadcrumbItems.length - 1

            return (
              <Fragment key={item}>
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="text-sm font-medium text-foreground">
                      {formatSegment(item)}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      href={href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {formatSegment(item)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default DashboardBreadcrumb