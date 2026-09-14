import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/pipedrive-integrations-hub/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Estimate - Pipedrive Integration Engine</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 7mm 9mm 7mm 9mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.5px;
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 7px;
      margin-bottom: 7px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #2563eb;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }}
    .subtitle {{
      font-size: 8.8px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 9px;
      font-size: 8.5px;
      text-align: right;
      line-height: 1.35;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 6px 0 5px 0;
    }}
    .section-title {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #2563eb;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.5px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 7px;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4px 6px;
      font-size: 9px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 9px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9.5px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 8.2px;
      margin-top: 1px;
      line-height: 1.25;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 5px 6px;
      font-size: 9.5px;
    }}
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 8px;
    }}
    .card-box-title {{
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 4px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.5px 0;
      font-size: 8.3px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 8.2px;
      color: #334155;
      margin-bottom: 3px;
      padding-left: 10px;
      position: relative;
      line-height: 1.25;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 8px;
    }}
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #2563eb;
      box-shadow: 0 1px 3px rgba(37,99,235,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 9px;
      color: #0f172a;
      line-height: 1.2;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8.2px;
      color: #334155;
      line-height: 1.2;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.8px;
      color: #475569;
      line-height: 1.2;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 18px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.5px;
      color: #1d4ed8;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1px 4px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
  <!-- Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Production Architecture Scope</div>
      <h1>Pipedrive Enterprise Integration Engine</h1>
      <p class="subtitle">Direct v1 Webhook Pipeline, Two-Way Sinch SMS Gateway & Power BI Star Schema Data Warehouse</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Shaun M. • Perth, Western Australia</div>
      <div><strong>Timeline:</strong> 10–14 Business Days (Modular Cadence)</div>
      <div><strong>Calibrated Rate:</strong> <strong>$40.00 / hr (Turnkey $2,280)</strong></div>
      <div><strong>Live Architecture Demo:</strong> <span class="live-badge">Live & Audited</span></div>
    </div>
  </div>

  <!-- Scope Table -->
  <div class="section-header">
    <h2 class="section-title">Milestone Scope & Delivery Schedule</h2>
    <div class="section-meta">https://pipedrive-integrations-hub.vercel.app</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Phase</th>
        <th style="width: 54%;">Engineering Deliverables & Architecture</th>
        <th style="width: 10%; text-align: center;">Hours</th>
        <th style="width: 10%; text-align: right;">Rate</th>
        <th style="width: 12%; text-align: right;">Investment</th>
      </tr>
    </thead>
    <tbody>
      <tr class="phase-0-row">
        <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
        <td>
          <div class="phase-name">Interactive Working Architecture Prototype & Webhook Cockpit</div>
          <div class="phase-desc">Two-way Sinch SMS simulator with AI qualification, native Pipedrive v1 webhook inspector (&lt;150ms), deterministic identity matching graph, and relational Star Schema entity viewer. Delivered upfront in &lt;30m to eliminate all architectural risk.</div>
        </td>
        <td style="text-align: center; font-weight: 700; white-space: nowrap;">0.5 hrs (&lt;30m)</td>
        <td style="text-align: right; color: #16a34a; font-weight: 700;">$0.00</td>
        <td style="text-align: right; font-weight: 800; color: #16a34a;">$0.00 (Live)</td>
      </tr>
      <tr>
        <td class="phase-num">Phase 1</td>
        <td>
          <div class="phase-name">Native Pipedrive Webhooks & Sinch 2-Way Gateway (Project 1)</div>
          <div class="phase-desc">Zero-Zapier serverless webhook listener (&lt;150ms, HMAC-SHA256 signature verification), Sinch Australian Custom Sender ID configuration, E.164 normalization, bidirectional Person/Deal lookup, and transcript sync to Notes.</div>
        </td>
        <td style="text-align: center; font-weight: 600;">14 hrs</td>
        <td style="text-align: right;">$40.00</td>
        <td style="text-align: right; font-weight: 700;">$560.00</td>
      </tr>
      <tr>
        <td class="phase-num">Phase 2</td>
        <td>
          <div class="phase-name">AI Qualification State Machine, Handover & TNZ Opt-Out (Project 1)</div>
          <div class="phase-desc">Multi-turn qualification state machine (OpenAI GPT-4o / Claude fallback chain), intent classifier, live salesperson handover (auto-assigns high-priority call task to Shaun M.), and Spam Act 2003 / TNZ opt-out interception (`STOP`).</div>
        </td>
        <td style="text-align: center; font-weight: 600;">13 hrs</td>
        <td style="text-align: right;">$40.00</td>
        <td style="text-align: right; font-weight: 700;">$520.00</td>
      </tr>
      <tr>
        <td class="phase-num">Phase 3</td>
        <td>
          <div class="phase-name">Website Tracking, Identity Resolution & Lead Scoring (Project 2)</div>
          <div class="phase-desc">First-party cookie & fingerprint ingestion, multi-touch UTM attribution graph, deterministic identity matching on form/SMS event, and real-time computation writing `lead_score`, `intent_tier`, and touchpoints to Pipedrive.</div>
        </td>
        <td style="text-align: center; font-weight: 600;">11 hrs</td>
        <td style="text-align: right;">$40.00</td>
        <td style="text-align: right; font-weight: 700;">$440.00</td>
      </tr>
      <tr>
        <td class="phase-num">Phase 4</td>
        <td>
          <div class="phase-name">Power BI Star Schema Pipeline & Delta Sync (Project 3)</div>
          <div class="phase-desc">Relational dimensional modeling (Fact_Deals, Dim_Persons, Fact_Activities, Dim_Stages), delta sync engine handling Pipedrive rate limits (40-80 req/s batch pagination), and OData/REST data feed endpoints for scheduled refresh.</div>
        </td>
        <td style="text-align: center; font-weight: 600;">12 hrs</td>
        <td style="text-align: right;">$40.00</td>
        <td style="text-align: right; font-weight: 700;">$480.00</td>
      </tr>
      <tr>
        <td class="phase-num">Phase 5</td>
        <td>
          <div class="phase-name">End-to-End Staging, Telco Load Testing & Production Go-Live</div>
          <div class="phase-desc">Live Australian telco route verification, duplicate webhook idempotency, out-of-order recovery, complete TypeScript repository handoff, environment runbook, and 14 days post-launch support.</div>
        </td>
        <td style="text-align: center; font-weight: 600;">7 hrs</td>
        <td style="text-align: right;">$40.00</td>
        <td style="text-align: right; font-weight: 700;">$280.00</td>
      </tr>
      <tr class="total-row">
        <td colspan="2" style="text-align: left; font-weight: 800;">TOTAL COMPLETE TURNKEY ROLLOUT (ALL 3 PROJECTS + STAGING)</td>
        <td style="text-align: center; font-weight: 800;">57 hrs</td>
        <td style="text-align: right; font-weight: 800;">$40.00</td>
        <td style="text-align: right; font-weight: 800;">$2,280.00</td>
      </tr>
    </tbody>
  </table>

  <!-- 2-Column Milestone & Architecture Grid -->
  <div class="grid-2col">
    <!-- Modular Milestone Options Box -->
    <div class="card-box">
      <div class="card-box-title">Modular Milestone Options (Fixed-Price Flexibility)</div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option A:</strong> Project 1 Only (AI SMS + Sinch + Handover + TNZ)</span>
        <span class="milestone-val">$1,080.00 (27 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option B:</strong> Project 2 Only (Web Tracking + Lead Scoring)</span>
        <span class="milestone-val">$440.00 (11 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option C:</strong> Project 3 Only (Power BI Star Schema Pipeline)</span>
        <span class="milestone-val">$480.00 (12 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option D:</strong> Complete Turnkey Package (All 3 Projects + Staging)</span>
        <span class="milestone-val">$2,280.00 (57 hrs)</span>
      </div>
    </div>

    <!-- Zero-Risk Compliance Guardrails Box -->
    <div class="card-box">
      <div class="card-box-title">Architecture Guardrails & Performance Guarantees</div>
      <div class="guardrail-item"><strong>Zero-Zapier Latency:</strong> Direct v1 webhooks execute in &lt;150ms with HMAC-SHA256 validation, eliminating multi-step Zapier polling delays and task tier fees.</div>
      <div class="guardrail-item"><strong>Spam Act 2003 & TNZ Guard:</strong> Instant `STOP` interception automatically suppresses outbound SMS queues and syncs opt-out flags to Pipedrive.</div>
      <div class="guardrail-item"><strong>API Rate Limit Safe:</strong> Batch-paginated delta sync protects Pipedrive's 40–80 req/s limit with pre-aggregated dimensional tables for Power BI.</div>
    </div>
  </div>

  <!-- Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> (Founder, 12+ Years Full-Stack)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Wyoming, USA</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://pipedrive-integrations-hub.vercel.app" target="_blank" class="demo-badge">pipedrive-integrations-hub.vercel.app</a>
    </div>
  </div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved estimate.html to:", html_path)

# Run headless Chrome to produce clean 1-page ESTIMATE.pdf with NO header/footer artifacts
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    print("File size:", os.path.getsize(pdf_path), "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

# Verify page count
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")
