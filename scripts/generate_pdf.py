import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

def build_pdf():
    pdf_path = os.path.expanduser("~/Apps/claude-code/pipedrive-integrations-hub/docs/ESTIMATE.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Palette
    c_primary = colors.HexColor("#0a2540")
    c_brand = colors.HexColor("#635bff")
    c_secondary = colors.HexColor("#425466")
    c_border = colors.HexColor("#e2e8f0")
    c_bg_subtle = colors.HexColor("#f8fafc")

    # Typography styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=c_primary,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=c_secondary,
        spaceAfter=10
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_primary,
        spaceBefore=10,
        spaceAfter=5
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_secondary,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=c_secondary,
        leftIndent=8,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white,
        alignment=0
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=c_primary
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=c_primary
    )

    table_cell_center = ParagraphStyle(
        'TableCellCenter',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=c_primary,
        alignment=1
    )

    table_cell_center_bold = ParagraphStyle(
        'TableCellCenterBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=c_primary,
        alignment=1
    )

    elements = []

    # Document Header
    elements.append(Paragraph("Pipedrive Integration Engine — Implementation & Architecture Estimate", title_style))
    elements.append(Paragraph("<b>Client:</b> Shaun M., Perth, Western Australia &nbsp;|&nbsp; <b>Prepared By:</b> Shakil Ahmed, BarakahSoft LLC &nbsp;|&nbsp; <b>Date:</b> September 14, 2026<br/><b>Live Interactive Architecture Demo:</b> <font color='#635bff'><u>https://pipedrive-integrations-hub.vercel.app</u></font> &nbsp;|&nbsp; <b>Standard Rate:</b> $150 / hr", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1, color=c_border, spaceBefore=0, spaceAfter=8))

    # Section 1: Executive Summary
    elements.append(Paragraph("1. Executive Summary & Delivery Scope", h1_style))
    elements.append(Paragraph("This architecture estimate covers complete production deployment across Shaun's 3 distinct integration projects without Zapier middleware:", body_style))
    elements.append(Paragraph("• <b>Project 1: Pipedrive + AI SMS Agent (Sinch Gateway)</b> — Native v1 webhooks (<200ms dispatch), two-way Sinch SMS, LLM conversation state machine, automatic Pipedrive Person/Deal logging, salesperson handover to Shaun M., and strict Australian Spam Act 2003 / TNZ opt-out synchronization.", bullet_style))
    elements.append(Paragraph("• <b>Project 2: Tracking Platform → Pipedrive + Lead Scoring</b> — First-party cookie ingestion, anonymous session to Person identity resolution, and real-time computation of <code>lead_score</code>, <code>intent_tier</code>, <code>first_touch_source</code>, and <code>last_touch_source</code> custom fields.", bullet_style))
    elements.append(Paragraph("• <b>Project 3: Pipedrive → Power BI Star Schema Data Warehouse</b> — Normalized relational dimensional modeling (Fact_Deals, Dim_Persons, Fact_Activities, Dim_PipelineStages), delta refresh engine handling API rate limits, and DirectQuery REST/OData feeds.", bullet_style))

    elements.append(Spacer(1, 6))

    # Section 2: Phase Breakdown Table
    elements.append(Paragraph("2. Engineering Phase Breakdown", h1_style))

    table_data = [
        [
            Paragraph("<b>Phase</b>", table_header_style),
            Paragraph("<b>Deliverables & Technical Scope</b>", table_header_style),
            Paragraph("<b>Hours</b>", table_header_style),
            Paragraph("<b>Rate</b>", table_header_style),
            Paragraph("<b>Total (USD)</b>", table_header_style)
        ],
        [
            Paragraph("<b>Phase 0</b>", table_cell_bold),
            Paragraph("<b>Architecture & Interactive Demo (Delivered)</b><br/>Two-way SMS simulator, identity matching graph, Star Schema entity viewer, zero-Zapier webhook inspector.", table_cell_style),
            Paragraph("<b>18 hrs</b>", table_cell_center_bold),
            Paragraph("<b>$0/hr</b>", table_cell_center_bold),
            Paragraph("<font color='#059669'><b>$0 (Delivered)</b></font>", table_cell_center_bold)
        ],
        [
            Paragraph("<b>Phase 1</b>", table_cell_bold),
            Paragraph("<b>Native Pipedrive Webhooks & Sinch 2-Way Gateway (Project 1)</b><br/>Zero-Zapier serverless webhook listener (<200ms, HMAC-SHA256), Sinch AU Custom Sender ID, E.164 normalization, Pipedrive Person/Deal bidirectional lookup, transcript logging to activities/notes.", table_cell_style),
            Paragraph("19 hrs", table_cell_center),
            Paragraph("$150/hr", table_cell_center),
            Paragraph("$2,850", table_cell_center_bold)
        ],
        [
            Paragraph("<b>Phase 2</b>", table_cell_bold),
            Paragraph("<b>AI Qualification State Machine, Handover & TNZ Opt-Out (Project 1)</b><br/>Multi-turn qualification state machine, buying intent classifier, live salesperson handover (auto-assigns high-priority call task to Shaun M.), Spam Act 2003 / TNZ opt-out interception (`STOP`), custom field suppression.", table_cell_style),
            Paragraph("17 hrs", table_cell_center),
            Paragraph("$150/hr", table_cell_center),
            Paragraph("$2,550", table_cell_center_bold)
        ],
        [
            Paragraph("<b>Phase 3</b>", table_cell_bold),
            Paragraph("<b>Website Tracking, Identity Resolution & Lead Scoring (Project 2)</b><br/>First-party cookie & fingerprint ingestion, multi-touch UTM attribution, deterministic identity matching graph, real-time lead score calculator writing custom fields to Pipedrive.", table_cell_style),
            Paragraph("15 hrs", table_cell_center),
            Paragraph("$150/hr", table_cell_center),
            Paragraph("$2,250", table_cell_center_bold)
        ],
        [
            Paragraph("<b>Phase 4</b>", table_cell_bold),
            Paragraph("<b>Power BI Star Schema Pipeline & Delta Sync (Project 3)</b><br/>Relational dimensional modeling (Fact_Deals, Dim_Persons, Fact_Activities, Dim_Stages), delta sync engine handling Pipedrive rate limits (40-80 req/s batch pagination), OData/REST data feed endpoints.", table_cell_style),
            Paragraph("16 hrs", table_cell_center),
            Paragraph("$150/hr", table_cell_center),
            Paragraph("$2,400", table_cell_center_bold)
        ],
        [
            Paragraph("<b>Phase 5</b>", table_cell_bold),
            Paragraph("<b>Staging, Telco Load Testing & Production Go-Live</b><br/>End-to-end integration test with live Australian telco dispatches, duplicate message idempotency, out-of-order webhook recovery, runbook, and team handoff.", table_cell_style),
            Paragraph("8 hrs", table_cell_center),
            Paragraph("$150/hr", table_cell_center),
            Paragraph("$1,200", table_cell_center_bold)
        ],
        [
            Paragraph("<b>TOTAL</b>", table_cell_bold),
            Paragraph("<b>Complete 3-Project Production Rollout</b>", table_cell_bold),
            Paragraph("<b>75 hrs</b>", table_cell_center_bold),
            Paragraph("<b>$150/hr</b>", table_cell_center_bold),
            Paragraph("<b>$11,250</b>", table_cell_center_bold)
        ]
    ]

    t = Table(table_data, colWidths=[50, 280, 50, 55, 85])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_brand),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#f0fdf4")),
        ('BACKGROUND', (0, -1), (-1, -1), c_bg_subtle),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    elements.append(t)

    elements.append(Spacer(1, 8))

    # Section 3: Rate Comparison & Modular Options
    elements.append(Paragraph("3. Value Proposition & Modular Scope Options", h1_style))
    elements.append(Paragraph("• <b>Junior Freelancer Approach ($35/hr):</b> 200–300+ billed hours ($7,000–$10,500) relying on brittle Zapier/Make multi-step zaps. Results in ongoing $300–$800/mo task tier costs, 5–15 min webhook latency, carrier spam filtering risks, and unnormalized flat Power BI tables that time out during refresh.<br/>• <b>BarakahSoft Direct Engineering ($150/hr):</b> 75 scoped hours ($11,250 total). Zero Zapier fees, sub-150ms native webhooks, automated Spam Act/TNZ compliance, and pre-indexed Star Schema tables.<br/>• <b>Modular Breakdown:</b> If preferred, projects can be commissioned independently: <i>Project 1 (AI SMS + Sinch + Handover + TNZ):</i> $5,400 (36 hrs) &nbsp;|&nbsp; <i>Project 2 (Tracking + Identity Matching):</i> $2,250 (15 hrs) &nbsp;|&nbsp; <i>Project 3 (Power BI Star Schema):</i> $2,400 (16 hrs).", body_style))

    # Section 4: Operating Costs & Delivery Schedule
    elements.append(Spacer(1, 6))
    elements.append(Paragraph("4. Operating Infrastructure & Delivery Schedule", h1_style))
    elements.append(Paragraph("• <b>Monthly Operating Cost:</b> Serverless compute ($20/mo) + Sinch AU routes (~$0.045 AUD/SMS) + Claude 3.5 Haiku (~$8/1k conversations). Zero additional Pipedrive or Zapier software costs.<br/>• <b>Delivery Cadence:</b> Weeks 1–2: Project 1 (Sinch SMS + Pipedrive + Handover + TNZ). Week 3: Project 2 (Web Tracking + Lead Scoring). Week 4: Project 3 (Power BI Star Schema Data Warehouse) & Go-Live.", body_style))

    doc.build(elements)
    print("PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    build_pdf()
