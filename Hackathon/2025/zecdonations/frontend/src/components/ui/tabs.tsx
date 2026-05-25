"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs = TabsPrimitive.Root;
export const TabsList = (props: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List {...props} className="inline-flex gap-2 rounded-md bg-muted p-1" />
);
export const TabsTrigger = (props: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger {...props} className="px-3 py-1.5 rounded text-sm data-[state=active]:bg-card data-[state=active]:text-foreground" />
);
export const TabsContent = (props: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content {...props} className="mt-4" />
);


