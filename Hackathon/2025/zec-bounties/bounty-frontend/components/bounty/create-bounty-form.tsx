"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBounty } from "@/lib/bounty-context";
import type { BountyFormData } from "@/lib/types";
import { CalendarIcon, DollarSign, Loader2 } from "lucide-react";

interface CreateBountyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateBountyForm({
  onSuccess,
  onCancel,
}: CreateBountyFormProps) {
  const { createBounty, users, nonAdminUsers, usersLoading, currentUser } =
    useBounty();
  const [formData, setFormData] = useState<BountyFormData>({
    title: "",
    description: "",
    assignee: "none",
    bountyAmount: 0,
    timeToComplete: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Users are already filtered to exclude admins in the context
  const availableUsers = nonAdminUsers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createBounty(formData);
      onSuccess?.();
      // Reset form
      setFormData({
        title: "",
        description: "",
        assignee: "none",
        bountyAmount: 0,
        timeToComplete: new Date(),
      });
    } catch (error) {
      console.error("Failed to create bounty:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      timeToComplete: new Date(e.target.value),
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Create New Bounty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Bounty Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter bounty title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe the bounty requirements, deliverables, and any specific instructions..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bountyAmount">Bounty Amount (ZEC)</Label>
              <Input
                id="bountyAmount"
                type="number"
                step="0.01"
                min="0"
                value={formData.bountyAmount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bountyAmount: Number.parseFloat(e.target.value) || 0,
                  }))
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeToComplete">Completion Deadline</Label>
              <div className="relative">
                <Input
                  id="timeToComplete"
                  type="datetime-local"
                  value={formData.timeToComplete.toISOString().slice(0, 16)}
                  onChange={handleDateChange}
                  required
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assign to (Optional)</Label>
            <Select
              value={formData.assignee}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, assignee: value }))
              }
              disabled={usersLoading}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    usersLoading
                      ? "Loading users..."
                      : "Select a user to assign this bounty to..."
                  }
                />
                {usersLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No assignment</SelectItem>
                {availableUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
                {availableUsers.length === 0 && !usersLoading && (
                  <SelectItem value="no-users" disabled>
                    No users available for assignment
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {usersLoading && (
              <p className="text-sm text-slate-500">
                Loading available users...
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Bounty"
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
