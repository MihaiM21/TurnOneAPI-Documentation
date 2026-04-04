import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { CodeBlock } from "@/components/code-block"
import {
  DocH1, DocH2, DocH3, DocP, InlineCode, DataTable, Callout, DocDivider,
} from "@/components/doc-primitives"

export const metadata: Metadata = { title: "Data Schemas" }

const toc = [
  { id: "telemetry", label: "Telemetry Schema", level: 1 as const },
  { id: "car-data-channels", label: "CarData Channels", level: 2 as const },
  { id: "position-data", label: "PositionData Stream", level: 2 as const },
  { id: "timing", label: "Timing Data", level: 1 as const },
  { id: "timing-lines", label: "TimingData Lines", level: 2 as const },
  { id: "session-params", label: "Session Parameters", level: 1 as const },
  { id: "session-metadata", label: "SessionMetadata Model", level: 2 as const },
  { id: "driver-comparison", label: "DriverComparison Model", level: 2 as const },
  { id: "db-schema", label: "Database Schema", level: 1 as const },
  { id: "errors", label: "Error Responses", level: 1 as const },
]

export default function SchemasPage() {
  return (
    <DocsPageWrapper
      toc={toc}
      prev={{ label: "REST Endpoints", href: "/docs/endpoints" }}
      next={{ label: "SDKs & Libraries", href: "/docs/sdks" }}
    >
      <DocH1>Data Schemas</DocH1>
      <DocP>
        This page documents the raw data structures returned by T1API, the internal validation
        models, and the MongoDB document schema used for caching processed results.
      </DocP>

      {/* Telemetry */}
      <section id="telemetry" className="scroll-mt-20">
        <DocH2 id="telemetry">Telemetry Schema (V2)</DocH2>
        <DocP>
          V2 telemetry originates from two F1 live data streams: <InlineCode>CarData.z.jsonStream</InlineCode>{" "}
          and <InlineCode>PositionData.z.jsonStream</InlineCode>. Both streams use a concatenated
          JSON format — one object per sample, separated by newlines.
        </DocP>

        <DocH3 id="car-data-channels">CarData Channels</DocH3>
        <DocP>
          The <InlineCode>Channels</InlineCode> object maps numeric keys to telemetry values. Apply
          the scaling factors below before displaying to users.
        </DocP>
        <DataTable
          headers={["Channel Key", "Name", "Unit", "Notes"]}
          rows={[
            ["0", "Speed", "km/h", "Needs scaling: raw value ÷ 1 (already in km/h)"],
            ["2", "RPM", "rpm/10", "Divide by 10 to get actual RPM"],
            ["3", "Gear", "0–8", "0 = reverse, 1–8 = forward gears"],
            ["4", "Throttle", "%", "0–100"],
            ["5", "Brake", "%", "0–100"],
          ]}
        />
        <CodeBlock
          language="json"
          filename="CarData.z.jsonStream — sample record"
          code={`{
  "Utc": "2025-03-16T13:00:00Z",
  "Lines": {
    "1": {
      "RacingNumber": 1,
      "Line": 1,
      "DriverNumber": 1,
      "LapsCompleted": 45,
      "LastLapTime": 80123,
      "Pit": 0,
      "TyreStint": 1,
      "TyreAge": 23,
      "TyreCompound": "MEDIUM",
      "Channels": {
        "0": 252,
        "2": 14200,
        "3": 6,
        "4": 85,
        "5": 0
      }
    },
    "44": { "..." : "..." }
  }
}`}
        />

        <DocH3 id="position-data">PositionData Stream</DocH3>
        <DocP>
          Car coordinates in meters relative to a circuit-specific origin. The{" "}
          <InlineCode>Z</InlineCode> axis represents elevation.
        </DocP>
        <CodeBlock
          language="json"
          filename="PositionData.z.jsonStream — sample record"
          code={`{
  "Utc": "2025-03-16T13:00:00Z",
  "Position": [
    {
      "RacingNumber": 1,
      "X": 1234.56,
      "Y": 5678.90,
      "Z": 23.45
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* Timing */}
      <section id="timing" className="scroll-mt-20">
        <DocH2 id="timing">Timing Data</DocH2>
        <DocP>
          Live timing originates from <InlineCode>TimingData.json</InlineCode> on the F1 live
          timing server. Lap and sector times are expressed in milliseconds.
        </DocP>

        <DocH3 id="timing-lines">TimingData Lines</DocH3>
        <CodeBlock
          language="json"
          filename="TimingData — single driver record"
          code={`{
  "Utc": "2025-03-16T13:45:23Z",
  "Lines": {
    "1": {
      "LastLapTime": 80123,
      "LastLapTimeInMs": 80123,
      "LastSectorTime": 32100,
      "LastSectorTimeInMs": 32100,
      "LapsCompleted": 45,
      "Pit": 0,
      "InPit": false,
      "FastestLapNum": 22,
      "FastestLap": 79456,
      "Status": "OnTrack"
    }
  }
}`}
        />
        <DataTable
          headers={["Field", "Type", "Description"]}
          rows={[
            ["LastLapTime", "integer (ms)", "Duration of the most recently completed lap"],
            ["LastSectorTime", "integer (ms)", "Duration of the most recently completed sector"],
            ["FastestLap", "integer (ms)", "Driver's personal best lap time this session"],
            ["FastestLapNum", "integer", "Lap number on which the personal best was set"],
            ["Status", "string", "OnTrack, InPit, OutLap, Retired"],
          ]}
        />
      </section>

      <DocDivider />

      {/* Session Params */}
      <section id="session-params" className="scroll-mt-20">
        <DocH2 id="session-params">Validation Models</DocH2>
        <DocP>
          T1API validates incoming request parameters using Pydantic models. Invalid parameters
          return a <InlineCode>400 Bad Request</InlineCode> with a descriptive message.
        </DocP>

        <DocH3 id="session-metadata">SessionMetadata</DocH3>
        <CodeBlock
          language="python"
          filename="models.py"
          code={`class SessionMetadata(BaseModel):
    year: int              # Validated: 2018–2030
    round_number: int      # Validated: 1–24
    session_type: str      # "Race", "Qualifying", "Practice 1", etc.
    event_name: str        # "Bahrain Grand Prix"
    generated_at: str      # ISO 8601 timestamp`}
        />

        <DocH3 id="driver-comparison">SessionParams &amp; DriverComparisonParams</DocH3>
        <CodeBlock
          language="python"
          filename="models.py"
          code={`class SessionParams(BaseModel):
    year: int          # Validated: 2018–2030
    gp: int            # Validated: 1–24
    session: str       # Validated against allowed sessions list


class DriverComparisonParams(SessionParams):
    driver1: str       # Validated: 3 chars, uppercase (e.g. VER)
    driver2: str       # Validated: 3 chars, uppercase (e.g. HAM)`}
        />

        <Callout variant="info">
          V2 endpoints use a relaxed <InlineCode>gp</InlineCode> type that accepts{" "}
          <InlineCode>Union[int, str]</InlineCode> — round number, event key, or partial name
          string. V1 requires an integer round number only.
        </Callout>
      </section>

      <DocDivider />

      {/* DB Schema */}
      <section id="db-schema" className="scroll-mt-20">
        <DocH2 id="db-schema">Database Schema (MongoDB)</DocH2>
        <DocP>
          Processed analysis results are cached in MongoDB to avoid recomputing the same session.
          Collections are named by year and pipeline version.
        </DocP>
        <DataTable
          headers={["Collection Name", "Pipeline", "Description"]}
          rows={[
            ["{year}_processed_data", "V1 (FastF1)", "Cached V1 analysis results"],
            ["{year}_processed_data_v2", "V2 (Custom client)", "Cached V2 analysis results"],
          ]}
        />
        <CodeBlock
          language="json"
          filename="MongoDB document"
          code={`{
  "_id": "ObjectId(...)",
  "gp_id": "2025_1_Bahrain",
  "session_type": "Race",
  "timestamp": "2025-04-04T12:34:00Z",
  "data": {
    "drivers": [
      {
        "number": 1,
        "code": "VER",
        "top_speed": 355.0,
        "avg_speed": 295.3,
        "throttle_avg": 78.5,
        "brake_avg": 45.2
      }
    ],
    "track_data": [],
    "timing": []
  }
}`}
        />
        <DocP>
          Cache TTL defaults to 3,600 seconds (1 hour). The cache is invalidated automatically when
          a session state change is detected.
        </DocP>
      </section>

      <DocDivider />

      {/* Error Responses */}
      <section id="errors" className="scroll-mt-20">
        <DocH2 id="errors">Error Responses</DocH2>
        <DocP>
          All error responses use the same envelope. The <InlineCode>request_id</InlineCode> field
          is present on every response — include it when contacting support.
        </DocP>
        <CodeBlock
          language="json"
          filename="error envelope"
          code={`{
  "detail": "Invalid parameters: session must be one of Q, R, FP1, FP2, FP3, S, SQ",
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-04-04T12:34:56.789Z"
}`}
        />
        <DataTable
          headers={["Field", "Type", "Description"]}
          rows={[
            ["detail", "string", "Human-readable error description"],
            ["request_id", "UUID string", "Unique ID for this request — use when reporting issues"],
            ["timestamp", "ISO 8601 string", "Server timestamp when the error occurred"],
            ["error_code", "string (optional)", "Machine-readable code for programmatic handling"],
          ]}
        />
      </section>
    </DocsPageWrapper>
  )
}
