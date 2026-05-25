// swagger/campaigns.swagger.js
export const campaignPaths = {
  "/api/campaigns": {
    get: {
      summary: "Get all active campaigns",
      description:
        "Retrieve a list of all active fundraising campaigns with their current progress and details",
      tags: ["Campaigns"],
      responses: {
        200: {
          description: "Successfully retrieved campaigns list",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      campaigns: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Campaign" },
                      },
                    },
                  },
                ],
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    campaigns: [
                      {
                        id: "campaign_123",
                        title: "Help Build Community Garden",
                        description:
                          "Raising funds for community garden project",
                        goalZec: 10.5,
                        receivedZec: 7.2,
                        category: "Community",
                        address: "zc1234567890abcdef",
                        createdAt: "2024-01-15T10:30:00.000Z",
                        creator: {
                          name: "john_doe",
                          handle: "@john_doe",
                          avatar: "a_abc123def456",
                        },
                        is_active: true,
                        progress: 68.57,
                        status: "ongoing",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Failed to retrieve campaigns",
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new campaign",
      description:
        "Create a new fundraising campaign with Zcash wallet integration",
      tags: ["Campaigns"],
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "description"],
              properties: {
                title: {
                  type: "string",
                  example: "Help Build Community Garden",
                  minLength: 5,
                  maxLength: 100,
                },
                description: {
                  type: "string",
                  example: "Raising funds for community garden project",
                  minLength: 10,
                  maxLength: 1000,
                },
                target_amount: {
                  type: "number",
                  example: 10.5,
                  minimum: 0.1,
                },
                category: {
                  type: "string",
                  example: "Community",
                  enum: [
                    "General",
                    "Community",
                    "Education",
                    "Health",
                    "Environment",
                    "Arts",
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Campaign created successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      campaign: {
                        type: "object",
                        properties: {
                          qr_code: {
                            type: "string",
                            description:
                              "QR code data URL for the Zcash address",
                          },
                          shareable_link: {
                            type: "string",
                            description: "Shareable campaign URL",
                          },
                        },
                      },
                    },
                  },
                ],
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    campaign: {
                      qr_code:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
                      shareable_link: "/campaigns/campaign_123",
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                validationError: {
                  value: {
                    success: false,
                    error:
                      "Title is required, Description must be at least 10 characters",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthenticated: {
                  value: {
                    success: false,
                    error: "Authentication required",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Failed to create campaign",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/api/campaigns/my-campaigns": {
    get: {
      summary: "Get user campaigns",
      description: "Retrieve all campaigns created by the authenticated user",
      tags: ["Campaigns"],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Successfully retrieved user campaigns",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      campaigns: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Campaign" },
                      },
                    },
                  },
                ],
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    campaigns: [
                      {
                        id: "campaign_123",
                        title: "My Campaign",
                        description: "My campaign description",
                        goalZec: 5.0,
                        receivedZec: 2.5,
                        category: "General",
                        address: "zc1234567890abcdef",
                        createdAt: "2024-01-15T10:30:00.000Z",
                        creator: {
                          name: "john_doe",
                          handle: "@john_doe",
                          avatar: "a_abc123def456",
                        },
                        is_withdraw : false,
                        is_active: true,
                        progress: 50.0,
                        status: "ongoing",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthenticated: {
                  value: {
                    success: false,
                    error: "Authentication required",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Failed to retrieve user campaigns",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/api/campaigns/{campaign_id}": {
    get: {
      summary: "Get campaign details",
      description: "Retrieve detailed information about a specific campaign",
      tags: ["Campaigns"],
      parameters: [
        {
          name: "campaign_id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Campaign ID",
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved campaign details",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      campaign: { $ref: "#/components/schemas/Campaign" },
                    },
                  },
                ],
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    campaign: {
                      id: "campaign_123",
                      title: "Help Build Community Garden",
                      description: "Raising funds for community garden project",
                      goalZec: 10.5,
                      receivedZec: 7.2,
                      category: "Community",
                      address: "zc1234567890abcdef",
                      createdAt: "2024-01-15T10:30:00.000Z",
                      creator: {
                        name: "john_doe",
                        handle: "@john_doe",
                        avatar: "a_abc123def456",
                      },
                      is_active: true,
                      progress: 68.57,
                      status: "ongoing",
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Campaign not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notFound: {
                  value: {
                    success: false,
                    error: "Campaign not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Failed to retrieve campaign",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/api/campaigns/my-campaigns/{campaign_id}": {
    delete: {
      summary: "Deactivate campaign",
      description: "Deactivate a campaign (only allowed for campaign owner)",
      tags: ["Campaigns"],
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "campaign_id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Campaign ID",
        },
      ],
      responses: {
        200: {
          description: "Campaign deactivated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
              examples: {
                success: {
                  value: {
                    success: true,
                    message: "Campaign deactivated successfully",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthenticated: {
                  value: {
                    success: false,
                    error: "Authentication required",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Not authorized to deactivate this campaign",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthorized: {
                  value: {
                    success: false,
                    error: "Not authorized to deactivate this campaign",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Campaign not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notFound: {
                  value: {
                    success: false,
                    error: "Campaign not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Failed to deactivate campaign",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  // In campaignPaths object
  "/api/campaigns/my-campaigns/withdraw": {
    post: {
      summary: "Withdraw funds from campaign",
      description:
        "Withdraw all funds from a campaign wallet to a specified Zcash address",
      tags: ["Campaigns"],
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["wallet_id", "to_address"],
              properties: {
                wallet_id: {
                  type: "string",
                  description: "Wallet ID associated with the campaign",
                  example: "wallet_123456",
                },
                to_address: {
                  type: "string",
                  description: "Zcash address to send funds to",
                  example:
                    "zc1234567890abcdefghijk1234567890abcdefghijk1234567890abcdefghijk1234567890abcdefghijk1234567890abc",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Withdrawal initiated successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Withdrawal initiated successfully",
                      },
                      transaction_id: {
                        type: "string",
                        description: "Transaction ID of the withdrawal",
                      }
                    },
                  },
                ],
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    message: "Withdrawal initiated successfully",
                    transaction_id: "tx_123456789abcdef",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or insufficient funds",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                validationError: {
                  value: {
                    success: false,
                    error: "wallet_id and to_address are required",
                  },
                },
                insufficientFunds: {
                  value: {
                    success: false,
                    error: "Insufficient funds for withdrawal",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthenticated: {
                  value: {
                    success: false,
                    error: "Authentication required",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Not authorized to withdraw from this campaign",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notAuthorized: {
                  value: {
                    success: false,
                    error: "Not authorized to withdraw from this campaign",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Campaign not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notFound: {
                  value: {
                    success: false,
                    error: "Campaign not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                serverError: {
                  value: {
                    success: false,
                    error: "Withdrawal processing failed",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const campaignSchemas = {
  Campaign: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Campaign unique identifier",
      },
      title: {
        type: "string",
        description: "Campaign title",
      },
      description: {
        type: "string",
        description: "Campaign description",
      },
      goalZec: {
        type: "number",
        description: "Target amount in ZEC",
      },
      receivedZec: {
        type: "number",
        description: "Amount received so far in ZEC",
      },
      category: {
        type: "string",
        description: "Campaign category",
      },
      address: {
        type: "string",
        description: "Zcash donation address",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Campaign creation date",
      },
      creator: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Creator username",
          },
          handle: {
            type: "string",
            description: "Creator handle with @",
          },
          avatar: {
            type: "string",
            description: "Creator avatar URL or hash",
          },
        },
      },
      is_active: {
        type: "boolean",
        description: "Whether the campaign is active",
      },
      progress: {
        type: "number",
        description: "Funding progress percentage",
      },
      status: {
        type: "string",
        enum: ["ongoing", "completed", "deactivated"],
        description: "Campaign status",
      },
    },
  },
};
