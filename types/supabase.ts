export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      account_table: {
        Row: {
          email: string;
          nickname: string | null;
          user_id: string;
        };
        Insert: {
          email: string;
          nickname?: string | null;
          user_id?: string;
        };
        Update: {
          email?: string;
          nickname?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      room_composition: {
        Row: {
          citizen_count: number | null;
          doctor_count: number | null;
          id: string;
          mafia_count: number | null;
          police_count: number | null;
          total_count: number;
        };
        Insert: {
          citizen_count?: number | null;
          doctor_count?: number | null;
          id?: string;
          mafia_count?: number | null;
          police_count?: number | null;
          total_count: number;
        };
        Update: {
          citizen_count?: number | null;
          doctor_count?: number | null;
          id?: string;
          mafia_count?: number | null;
          police_count?: number | null;
          total_count?: number;
        };
        Relationships: [];
      };
      room_table: {
        Row: {
          created_at: string | null;
          current_user_count: number;
          game_category: string | null;
          room_id: string;
          title: string | null;
          total_user_count: number;
          is_playing: boolean;
        };
        Insert: {
          created_at?: string | null;
          current_user_count?: number;
          game_category?: string | null;
          room_id?: string;
          title?: string | null;
          total_user_count?: number;
        };
        Update: {
          created_at?: string | null;
          current_user_count?: number;
          game_category?: string | null;
          room_id?: string;
          title?: string | null;
          total_user_count?: number;
        };
        Relationships: [];
      };
      room_user_match_table: {
        Row: {
          choose_time: string | null;
          chosen_by: string | null;
          is_lived: boolean;
          is_ready: boolean;
          match_id: string;
          r0NightStart: boolean;
          role: string | null;
          room_id: string | null;
          user_id: string | null;
          user_nickname: string | null;
          vote_to: boolean | null;
          voted_count: number;
        };
        Insert: {
          choose_time?: string | null;
          chosen_by?: string | null;
          is_lived?: boolean;
          is_ready?: boolean;
          match_id?: string;
          r0NightStart?: boolean;
          role?: string | null;
          room_id?: string | null;
          user_id?: string | null;
          user_nickname?: string | null;
          vote_to?: boolean | null;
          voted_count?: number;
        };
        Update: {
          choose_time?: string | null;
          chosen_by?: string | null;
          is_lived?: boolean;
          is_ready?: boolean;
          match_id?: string;
          r0NightStart?: boolean;
          role?: string | null;
          room_id?: string | null;
          user_id?: string | null;
          user_nickname?: string | null;
          vote_to?: boolean | null;
          voted_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_room_user_match_table_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "room_table";
            referencedColumns: ["room_id"];
          }
        ];
      };
      ranking_table: {
        Row: {
          game_category: string | null;
          id: number;
          nickname: string;
          total_point: number | null;
          user_id: string | null;
        };
        Insert: {
          game_category?: string | null;
          id?: number;
          nickname: string;
          total_point?: number | null;
          user_id?: string | null;
        };
        Update: {
          game_category?: string | null;
          id?: number;
          nickname?: string;
          total_point?: number | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
