export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      demo_usage: {
        Row: {
          created_at: string
          email: string
          experience_type: string
          id: string
          ip_address: string | null
        }
        Insert: {
          created_at?: string
          email: string
          experience_type: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          experience_type?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      event_media: {
        Row: {
          created_at: string
          description: string | null
          event_name: string | null
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_name?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_name?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      instagram_credentials: {
        Row: {
          access_token: string
          business_account_id: string
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          access_token: string
          business_account_id: string
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          access_token?: string
          business_account_id?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          converted: boolean
          created_at: string
          email: string
          experience_type: string | null
          first_seen_at: string
          id: string
          ip_address: string | null
          last_interaction_at: string
          notes: string | null
          referrer: string | null
          source: string
          total_demos_used: number
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          converted?: boolean
          created_at?: string
          email: string
          experience_type?: string | null
          first_seen_at?: string
          id?: string
          ip_address?: string | null
          last_interaction_at?: string
          notes?: string | null
          referrer?: string | null
          source: string
          total_demos_used?: number
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          converted?: boolean
          created_at?: string
          email?: string
          experience_type?: string | null
          first_seen_at?: string
          id?: string
          ip_address?: string | null
          last_interaction_at?: string
          notes?: string | null
          referrer?: string | null
          source?: string
          total_demos_used?: number
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          caption: string
          created_at: string
          error_message: string | null
          hashtags: string | null
          id: string
          image_url: string
          instagram_post_id: string | null
          next_retry_at: string | null
          published_at: string | null
          retry_count: number
          scheduled_for: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          caption: string
          created_at?: string
          error_message?: string | null
          hashtags?: string | null
          id?: string
          image_url: string
          instagram_post_id?: string | null
          next_retry_at?: string | null
          published_at?: string | null
          retry_count?: number
          scheduled_for: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          caption?: string
          created_at?: string
          error_message?: string | null
          hashtags?: string | null
          id?: string
          image_url?: string
          instagram_post_id?: string | null
          next_retry_at?: string | null
          published_at?: string | null
          retry_count?: number
          scheduled_for?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_gallery: {
        Row: {
          created_at: string
          custom_prompt: string | null
          experience_type: string
          id: string
          original_image_url: string
          style_used: string | null
          transformed_image_url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          custom_prompt?: string | null
          experience_type: string
          id?: string
          original_image_url: string
          style_used?: string | null
          transformed_image_url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          custom_prompt?: string | null
          experience_type?: string
          id?: string
          original_image_url?: string
          style_used?: string | null
          transformed_image_url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
