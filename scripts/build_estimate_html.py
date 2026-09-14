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
  <title>Production Scope & Formal Estimate - Pipedrive Enterprise Integration Engine</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 5.5mm 8.5mm 5.5mm 8.5mm;
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
      line-height: 1.36;
      font-size: 10.4px;
    }}

    /* Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 7px;
      margin-bottom: 7px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.8px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #2563eb;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 15.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 9px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8.8px;
      text-align: right;
      line-height: 1.38;
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

    /* Section Headings */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0 5px 0;
    }}
    .section-title {{
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #2563eb;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.8px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}

    /* Table */
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
      font-size: 8.8px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 5px 7px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 6.5px 7px;
      font-size: 9.3px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 9.3px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9.8px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 8.5px;
      margin-top: 1.5px;
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
      padding: 6px 7px;
      font-size: 9.8px;
    }}

    /* 2-Column Grid */
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
      padding: 8px 10px;
    }}
    .card-box-title {{
      font-size: 9.2px;
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
      padding: 3px 0;
      font-size: 8.5px;
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
      font-size: 8.4px;
      color: #334155;
      margin-bottom: 3.5px;
      padding-left: 11px;
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

    /* Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 8px 10px;
      margin-bottom: 7px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 8.3px;
      line-height: 1.25;
    }}
    .term-title {{
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      font-size: 8.3px;
      margin-bottom: 2px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* Formal Authorization & Acceptance Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 9px 12px;
      margin-bottom: 7px;
    }}
    .auth-title {{
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 8.4px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 8.2px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 5px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 35px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13.5px;
      color: #1e3a8a;
      padding-left: 4px;
      padding-bottom: 2px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 35px;
      font-family: ui-monospace, monospace;
      font-size: 8.8px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 2px;
    }}
    .auth-label {{
      font-size: 7.4px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 2px;
    }}

    /* Footer Container */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #2563eb;
      box-shadow: 0 1px 3px rgba(37,99,235,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 9.2px;
      color: #0f172a;
      line-height: 1.2;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8.4px;
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
      gap: 3px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 18px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 8px;
      color: #1d4ed8;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1.5px 5px;
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
      <div class="brand-title">BarakahSoft LLC • Enterprise Systems Engineering • Document #BS-2026-PIPE-049</div>
      <h1>Pipedrive Enterprise Integration Engine</h1>
      <p class="subtitle">Direct v1 Webhook Pipeline, Two-Way Sinch SMS Gateway, AI Lead Qualification & Power BI Star Schema</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Shaun M. • Perth, Western Australia</div>
      <div><strong>Timeline:</strong> 10–14 Business Days (Modular Cadence)</div>
      <div><strong>Calibrated Rate:</strong> <strong>$40.00 / hr (Turnkey Package: $2,280.00)</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified & Audited</span></div>
    </div>
  </div>

  <!-- Scope Table -->
  <div class="section-header">
    <h2 class="section-title">Milestone Scope & Delivery Schedule</h2>
    <div class="section-meta">Live Demo: https://pipedrive-integrations-hub.vercel.app</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 13%;">Phase</th>
        <th style="width: 55%;">Engineering Deliverables & Architecture</th>
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

  <!-- Commercial Terms & Conditions -->
  <div class="terms-box">
    <div class="card-box-title" style="margin-bottom: 4px;">Commercial Terms & Production Engagement Conditions</div>
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Milestones</div>
        <div class="term-body">100% milestone-based on Upwork. Funds deposited in escrow per phase and released strictly upon verified staging sign-off.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Full IP Ownership</div>
        <div class="term-body">Complete copyright, source code, Git repositories, architectural blueprints, and environment configurations transfer to Client.</div>
      </div>
      <div class="term-col">
        <div class="term-title">14-Day Hypercare SLA</div>
        <div class="term-body">Includes 14 days of complimentary post-deployment monitoring, carrier route audits, and priority bug resolution at zero cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Quote Validity</div>
        <div class="term-body">Valid for 30 days through October 14, 2026. Turnkey fixed price of $2,280.00 covers all specified deliverables without hidden fees.</div>
      </div>
    </div>
  </div>

  <!-- Formal Acceptance Authorization -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization & Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.6px; color: #475569;">Legally binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect & Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed (Digital Seal Verified)</div>
          <div class="auth-date-field">14 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Shaun M. (Perth, WA)</div>
        <div>Signatory: <strong>Shaun M.</strong> • Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8.5px; font-style: italic;">[ Accepted via Upwork Contract Offer / Signature ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Client Acceptance Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder & Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Pipedrive Integrations Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Top Rated Upwork Expert</div>
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
