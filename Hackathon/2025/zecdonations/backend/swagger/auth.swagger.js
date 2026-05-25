// swagger/auth.swagger.js
export const authPaths = {
  '/api/auth/user': {
    get: {
      summary: 'Get current authenticated user',
      description: 'Retrieve information about the currently authenticated user from the session',
      tags: ['Authentication'],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: 'Successfully retrieved user information',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/SuccessResponse' },
                  {
                    type: 'object',
                    properties: {
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                ]
              },
              examples: {
                success: {
                  value: {
                    success: true,
                    user: {
                      discord_id: "123456789012345678",
                      username: "john_doe#1234",
                      avatar: "a_abc123def456"
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'User not authenticated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              examples: {
                notAuthenticated: {
                  value: {
                    success: false,
                    error: "Not authenticated"
                  }
                }
              }
            }
          }
        },
        500: { description: 'Internal server error' }
      }
    }
  },
  '/api/auth/logout': {
    post: {
      summary: 'Logout current user',
      description: 'Destroy the current user session and log them out',
      tags: ['Authentication'],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: 'Successfully logged out',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LogoutResponse' },
              examples: {
                success: {
                  value: {
                    success: true,
                    message: "Logged out successfully"
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Logout failed due to server error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              examples: {
                logoutFailed: {
                  value: {
                    success: false,
                    error: "Logout failed"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};