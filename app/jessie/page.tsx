"use client";

import { useState } from "react";
import { useJessie } from "./useJessie";

export default function JessiePage() {
  const {
    userInput,
    setUserInput,
    page,
    setPage,
    premium,
    setPremium,
    response,
    loading,
    copied,
    canSubmit,
    submit,
    copyPrompt,
    reset,
  } = useJessie();

  const [heroHovered, setHeroHovered] = useState(false);
  const [formHovered, setFormHovered] = useState(false);
  const [responseHovered, setResponseHovered] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState<string | null>(null);

  return (
    <div className="dream-page">
      <div className="sky sky-1" />
      <div className="sky sky-2" />
      <div className="sky sky-3" />

      <div className="stars stars-1" />
      <div className="stars stars-2" />

      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      <div className="floating-orb orb-4" />

      <div className="leaf leaf-1">✦</div>
      <div className="leaf leaf-2">✿</div>
      <div className="leaf leaf-3">❊</div>
      <div className="leaf leaf-4">✧</div>

      <div className="page-shell">
        <section
          className={`hero-card ${heroHovered ? "hovered" : ""}`}
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
        >
          <div className="hero-glow glow-1" />
          <div className="hero-glow glow-2" />
          <div className="hero-glow glow-3" />

          <div className="hero-content">
            <div className="hero-pill">Jessie Prompt Studio</div>
            <h1>
              Build a dreamy
              <span>prompt that feels magical</span>
            </h1>
            <p>
              Describe your idea and Jessie will shape it into a cleaner,
              stronger final prompt with a soft, elegant creative touch.
            </p>

            <div className="hero-tags">
              <span>Dreamy UI</span>
              <span>Prompt crafting</span>
              <span>Gentle guidance</span>
              <span>Premium toggle</span>
            </div>
          </div>
        </section>

        <div className="content-grid">
          <section
            className={`panel ${formHovered ? "hovered" : ""}`}
            onMouseEnter={() => setFormHovered(true)}
            onMouseLeave={() => setFormHovered(false)}
          >
            <div className="panel-heading">
              <div className="tiny-sparkle">✦</div>
              <div>
                <h2>Create with Jessie</h2>
                <p>
                  Tell Jessie what you want to make, choose the page type, and
                  generate a polished final prompt.
                </p>
              </div>
            </div>

            <label className="field-label" htmlFor="jessie-input">
              Your idea
            </label>
            <textarea
              id="jessie-input"
              className={textareaFocused ? "focused" : ""}
              placeholder="Describe what you want Jessie to create..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => setTextareaFocused(true)}
              onBlur={() => setTextareaFocused(false)}
            />

            <div className="two-col">
              <div>
                <label className="field-label" htmlFor="page-select">
                  Page mode
                </label>
                <select
                  id="page-select"
                  className={selectFocused ? "focused" : ""}
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  onFocus={() => setSelectFocused(true)}
                  onBlur={() => setSelectFocused(false)}
                >
                  <option value="create">Create</option>
                  <option value="refine">Refine</option>
                  <option value="explore">Explore</option>
                </select>
              </div>

              <div>
                <label className="field-label">Access</label>
                <button
                  type="button"
                  className={`access-btn ${premium ? "premium-on" : ""} ${
                    buttonHovered === "premium" ? "btn-hovered" : ""
                  }`}
                  onClick={() => setPremium((prev) => !prev)}
                  onMouseEnter={() => setButtonHovered("premium")}
                  onMouseLeave={() => setButtonHovered(null)}
                >
                  {premium ? "Premium enabled ✨" : "Enable premium"}
                </button>
              </div>
            </div>

            <div className="action-row">
              <button
                type="button"
                className={`primary-btn ${
                  buttonHovered === "submit" ? "btn-hovered" : ""
                }`}
                onClick={submit}
                disabled={!canSubmit}
                onMouseEnter={() => setButtonHovered("submit")}
                onMouseLeave={() => setButtonHovered(null)}
              >
                {loading ? "Creating..." : "Generate prompt"}
              </button>

              <button
                type="button"
                className={`secondary-btn ${
                  buttonHovered === "reset" ? "btn-hovered" : ""
                }`}
                onClick={reset}
                onMouseEnter={() => setButtonHovered("reset")}
                onMouseLeave={() => setButtonHovered(null)}
              >
                Reset
              </button>
            </div>

            <div className="mini-note">
              <span>☁️</span>
              <p>
                Tip: the more detail you give Jessie, the more tailored the
                final prompt will feel.
              </p>
            </div>
          </section>

          <section
            className={`panel response-panel ${
              responseHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setResponseHovered(true)}
            onMouseLeave={() => setResponseHovered(false)}
          >
            <div className="panel-sparkle" />

            {!response ? (
              <div className="empty-state">
                <div className="sparkle-icon">✧</div>
                <div>
                  <h2>Your result will appear here</h2>
                  <p>
                    Once Jessie finishes, you’ll see the summary, the final
                    prompt, and a little explanation of why it works.
                  </p>
                </div>

                <div className="feature-list">
                  <div className="feature-item">
                    <span>✦</span>
                    <span>Clear final prompt formatting</span>
                  </div>
                  <div className="feature-item">
                    <span>✦</span>
                    <span>Readable summaries and title ideas</span>
                  </div>
                  <div className="feature-item">
                    <span>✦</span>
                    <span>Easy copy button for the final prompt</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="response-content">
                <div className="response-header">
                  <div>
                    <h2>
                      {response.success
                        ? response.result?.title || "Jessie’s response"
                        : "Something went wrong"}
                    </h2>
                    <p>
                      {response.success
                        ? response.result?.summary ||
                          "Jessie created a result for your request."
                        : "Jessie couldn’t complete that request this time."}
                    </p>
                  </div>

                  <div
                    className={`status-pill ${
                      response.success ? "success" : "failed"
                    }`}
                  >
                    {response.success ? "Ready" : "Error"}
                  </div>
                </div>

                {response.success ? (
                  <div className="response-stack">
                    {response.result?.final_prompt ? (
                      <div className="final-prompt-card">
                        <div className="final-prompt-top">
                          <strong>Final prompt</strong>
                          <button
                            type="button"
                            className={`copy-btn ${copied ? "copied" : ""} ${
                              buttonHovered === "copy" ? "btn-hovered" : ""
                            }`}
                            onClick={copyPrompt}
                            onMouseEnter={() => setButtonHovered("copy")}
                            onMouseLeave={() => setButtonHovered(null)}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <div className="final-prompt-box">
                          {response.result.final_prompt}
                        </div>
                      </div>
                    ) : null}

                    {response.result?.why_this_works ? (
                      <div className="final-prompt-card">
                        <div className="final-prompt-top">
                          <strong>Why this works</strong>
                        </div>
                        <div className="final-prompt-box">
                          {response.result.why_this_works}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="error-box">
                    {response.error || "Something went wrong."}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <div className="page-footer">
          Made with soft gradients, dreamy light, and a little Jessie sparkle.
        </div>
      </div>

      <style jsx>{`
        .dream-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, #fff0f6 0%, #fff7f1 18%, #f9f4ff 38%, #eef7ff 62%, #fff8ea 82%, #fffdf8 100%);
          padding: 32px 18px 56px;
        }

        .page-shell {
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .sky,
        .stars,
        .floating-orb,
        .leaf {
          pointer-events: none;
          user-select: none;
        }

        .sky {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .sky-1 {
          background: radial-gradient(circle at 15% 20%, rgba(255, 175, 206, 0.18), transparent 25%);
        }

        .sky-2 {
          background: radial-gradient(circle at 85% 18%, rgba(173, 156, 255, 0.18), transparent 26%);
        }

        .sky-3 {
          background: radial-gradient(circle at 50% 85%, rgba(255, 213, 138, 0.18), transparent 28%);
        }

        .stars {
          position: fixed;
          inset: 0;
          z-index: 0;
          opacity: 0.6;
          background-repeat: repeat;
          animation: twinkle 6s linear infinite;
        }

        .stars-1 {
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.95) 1.2px, transparent 1.2px),
            radial-gradient(circle, rgba(255,226,120,0.95) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,198,230,0.9) 1px, transparent 1px);
          background-size: 160px 160px, 220px 220px, 260px 260px;
          background-position: 0 0, 40px 60px, 100px 120px;
        }

        .stars-2 {
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,214,87,0.8) 1px, transparent 1px);
          background-size: 190px 190px, 280px 280px;
          background-position: 60px 20px, 120px 140px;
          animation-duration: 9s;
        }

        .floating-orb {
          position: fixed;
          border-radius: 999px;
          filter: blur(65px);
          opacity: 0.42;
          z-index: 0;
          animation: floatOrb 14s ease-in-out infinite;
        }

        .orb-1 {
          width: 280px;
          height: 280px;
          top: 60px;
          left: -60px;
          background: rgba(255, 157, 196, 0.36);
        }

        .orb-2 {
          width: 260px;
          height: 260px;
          top: 200px;
          right: 10px;
          background: rgba(174, 156, 255, 0.3);
          animation-delay: 1.8s;
        }

        .orb-3 {
          width: 240px;
          height: 240px;
          bottom: 20px;
          left: 20%;
          background: rgba(255, 210, 136, 0.24);
          animation-delay: 3.2s;
        }

        .orb-4 {
          width: 220px;
          height: 220px;
          bottom: 80px;
          right: 24%;
          background: rgba(165, 237, 204, 0.18);
          animation-delay: 2.2s;
        }

        .leaf {
          position: fixed;
          z-index: 0;
          font-size: 26px;
          opacity: 0.22;
          animation: drift 12s ease-in-out infinite;
        }

        .leaf-1 {
          top: 120px;
          left: 7%;
          color: #d6759a;
        }

        .leaf-2 {
          top: 68%;
          right: 10%;
          color: #b392ff;
          animation-delay: 1.6s;
        }

        .leaf-3 {
          top: 30%;
          right: 18%;
          color: #f2c14f;
          animation-delay: 2.4s;
        }

        .leaf-4 {
          bottom: 14%;
          left: 12%;
          color: #7f7cff;
          animation-delay: 0.8s;
        }

        .hero-card,
        .panel {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(140, 106, 113, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .hero-card {
          border-radius: 36px;
          padding: 36px 30px;
          margin-bottom: 24px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.84),
            rgba(255,244,248,0.76),
            rgba(246,243,255,0.74),
            rgba(255,249,232,0.7)
          );
          box-shadow:
            0 24px 64px rgba(112, 79, 94, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.82);
        }

        .hero-card.hovered {
          transform: translateY(-3px);
          box-shadow:
            0 30px 82px rgba(112, 79, 94, 0.14),
            inset 0 1px 0 rgba(255,255,255,0.82);
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .glow-1 {
          width: 240px;
          height: 240px;
          right: -50px;
          top: -60px;
          background: radial-gradient(circle, rgba(255, 177, 207, 0.28), transparent 70%);
        }

        .glow-2 {
          width: 220px;
          height: 220px;
          left: -70px;
          bottom: -90px;
          background: radial-gradient(circle, rgba(180, 168, 255, 0.24), transparent 70%);
        }

        .glow-3 {
          width: 180px;
          height: 180px;
          right: 20%;
          bottom: -70px;
          background: radial-gradient(circle, rgba(255, 215, 120, 0.24), transparent 70%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          padding: 9px 15px;
          border-radius: 999px;
          background: rgba(255, 214, 87, 0.1);
          color: #8a5c6d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 214, 87, 0.16);
        }

        .hero-content h1 {
          margin: 18px 0 12px;
          max-width: 760px;
          font-size: clamp(2.7rem, 6vw, 5.2rem);
          line-height: 0.92;
          letter-spacing: -0.06em;
          color: #37252d;
        }

        .hero-content h1 span {
          display: block;
          background: linear-gradient(135deg, #e56ea5, #8d68ff, #ffd257);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-content p {
          margin: 0;
          max-width: 760px;
          font-size: 1.08rem;
          line-height: 1.85;
          color: #715b65;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .hero-tags span {
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 0.93rem;
          font-weight: 700;
          color: #6d4d58;
          background: linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,247,214,0.95));
          border: 1px solid rgba(255, 210, 104, 0.18);
          box-shadow: 0 8px 24px rgba(255, 196, 83, 0.08);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 20px;
          align-items: start;
        }

        .panel {
          border-radius: 30px;
          padding: 24px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.82),
            rgba(255,247,250,0.74),
            rgba(255,250,235,0.7)
          );
          box-shadow: 0 18px 45px rgba(71, 43, 36, 0.07);
        }

        .panel.hovered {
          transform: translateY(-3px);
          box-shadow: 0 26px 55px rgba(71, 43, 36, 0.1);
          border-color: rgba(150, 110, 124, 0.16);
        }

        .panel-heading {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .tiny-sparkle {
          width: 38px;
          height: 38px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ffe2ef, #fff0b8, #efe6ff);
          color: #8d6170;
          font-size: 16px;
          flex-shrink: 0;
          box-shadow: 0 8px 18px rgba(160, 114, 139, 0.12);
        }

        .panel-heading h2,
        .empty-state h2,
        .response-header h2 {
          margin: 0;
          color: #3c2830;
          font-size: 1.65rem;
        }

        .panel-heading p,
        .empty-state p,
        .response-header p {
          margin: 8px 0 0;
          color: #78636c;
          line-height: 1.8;
          font-size: 1rem;
        }

        .field-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 800;
          color: #513841;
          font-size: 1rem;
        }

        textarea,
        select {
          width: 100%;
          box-sizing: border-box;
          border-radius: 20px;
          border: 1px solid rgba(140, 106, 113, 0.14);
          background: linear-gradient(180deg, #fffdfd, #fff9f1);
          color: #3c2a31;
          outline: none;
          transition: all 0.25s ease;
        }

        textarea {
          padding: 18px;
          min-height: 220px;
          resize: vertical;
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 18px;
          box-shadow: inset 0 1px 2px rgba(61, 42, 38, 0.04);
        }

        select {
          padding: 14px 16px;
          font-size: 1rem;
        }

        textarea.focused,
        select.focused {
          border: 1px solid rgba(167, 94, 145, 0.3);
          box-shadow: 0 0 0 4px rgba(255, 210, 87, 0.12);
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }

        .action-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn,
        .access-btn,
        .copy-btn {
          transition: all 0.25s ease;
        }

        .primary-btn {
          padding: 14px 20px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #e0619a, #8d68ff, #ffd34f);
          background-size: 180% 180%;
          color: #fff;
          font-weight: 800;
          font-size: 0.98rem;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(153, 95, 150, 0.24);
          animation: gradientShift 6s ease infinite;
        }

        .primary-btn:disabled {
          background: #d8cfd5;
          box-shadow: none;
          cursor: not-allowed;
          animation: none;
        }

        .secondary-btn {
          padding: 14px 20px;
          border-radius: 16px;
          border: 1px solid rgba(130, 98, 88, 0.16);
          background: rgba(255,255,255,0.78);
          color: #5e474f;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }

        .access-btn {
          width: 100%;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(130, 98, 88, 0.16);
          background: linear-gradient(180deg, #fffefd, #fff8f1);
          color: #3d2a31;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .access-btn.premium-on {
          border: 1px solid rgba(128, 72, 120, 0.28);
          background: linear-gradient(135deg, #e56ea5, #8d68ff, #ffd257);
          background-size: 180% 180%;
          color: #fff;
          box-shadow: 0 16px 30px rgba(120, 82, 164, 0.22);
          animation: gradientShift 7s ease infinite;
        }

        .copy-btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(130, 98, 88, 0.18);
          background: #ffffff;
          color: #4e373f;
          font-weight: 800;
          cursor: pointer;
        }

        .copy-btn.copied {
          border-color: rgba(37, 122, 70, 0.2);
          background: #eaf8ee;
          color: #257a46;
        }

        .btn-hovered {
          transform: translateY(-2px) scale(1.01);
        }

        .mini-note {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
          padding: 12px 14px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,244,248,0.82), rgba(255,248,221,0.82));
          color: #775f68;
          border: 1px solid rgba(145, 112, 122, 0.08);
        }

        .mini-note p {
          margin: 0;
          font-size: 0.96rem;
        }

        .response-panel {
          min-height: 560px;
        }

        .panel-sparkle {
          position: absolute;
          right: -60px;
          bottom: -60px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 209, 102, 0.2), transparent 70%);
        }

        .empty-state {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          min-height: 100%;
        }

        .sparkle-icon {
          width: 76px;
          height: 76px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ffe7ef, #fff0b8, #efe7ff);
          color: #8a5c68;
          font-size: 29px;
          box-shadow: 0 12px 28px rgba(162, 120, 145, 0.16);
          animation: floatGlow 3.6s ease-in-out infinite;
        }

        .feature-list {
          display: grid;
          gap: 12px;
          margin-top: 6px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,250,247,0.94), rgba(255,248,222,0.9));
          border: 1px solid rgba(255, 210, 104, 0.12);
          color: #5f4a52;
          font-size: 1rem;
          animation: fadeUp 0.5s ease both;
        }

        .feature-item span:first-child {
          color: #d7a631;
          font-weight: 700;
        }

        .response-content {
          position: relative;
          z-index: 1;
          animation: fadeIn 0.35s ease;
        }

        .response-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
        }

        .status-pill {
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
        }

        .status-pill.success {
          background: #eaf8ee;
          color: #257a46;
          border: 1px solid rgba(37,122,70,0.12);
        }

        .status-pill.failed {
          background: #fff0f0;
          color: #b42318;
          border: 1px solid rgba(180,35,24,0.12);
        }

        .response-stack {
          display: grid;
          gap: 16px;
        }

        .final-prompt-card {
          border-radius: 22px;
          padding: 18px;
          background: linear-gradient(180deg, #fffdfc, #fff9f1);
          border: 1px solid rgba(133, 101, 91, 0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
          animation: fadeUp 0.35s ease;
        }

        .final-prompt-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .final-prompt-top strong {
          color: #4e373f;
          font-size: 1rem;
        }

        .final-prompt-box {
          padding: 16px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(130, 98, 88, 0.12);
          white-space: pre-wrap;
          line-height: 1.8;
          color: #3d2a31;
          font-size: 0.98rem;
        }

        .error-box {
          padding: 16px;
          border-radius: 18px;
          background: #fff2f2;
          border: 1px solid rgba(180,35,24,0.12);
          color: #b42318;
          line-height: 1.7;
          font-size: 1rem;
          animation: fadeUp 0.35s ease;
        }

        .page-footer {
          text-align: center;
          color: #907982;
          margin-top: 28px;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .dream-page {
            padding: 20px 14px 40px;
          }

          .hero-card {
            border-radius: 24px;
            padding: 24px 18px;
          }

          .hero-content h1 {
            font-size: 2.35rem;
            line-height: 0.98;
          }

          .hero-content p {
            font-size: 0.98rem;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .panel {
            border-radius: 22px;
            padding: 18px;
          }

          .panel-heading h2,
          .empty-state h2,
          .response-header h2 {
            font-size: 1.4rem;
          }

          textarea {
            min-height: 180px;
            padding: 15px 14px;
            font-size: 0.95rem;
          }

          select,
          .access-btn {
            padding: 13px 14px;
            font-size: 0.95rem;
          }

          .two-col {
            grid-template-columns: 1fr;
          }

          .action-row {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn,
          .copy-btn {
            width: 100%;
          }

          .response-panel {
            min-height: auto;
          }

          .response-header,
          .final-prompt-top {
            flex-direction: column;
            align-items: stretch;
          }

          .page-footer {
            font-size: 0.88rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGlow {
          0%,
          100% {
            transform: translateY(0px);
            box-shadow: 0 12px 28px rgba(162, 120, 145, 0.16);
          }
          50% {
            transform: translateY(-5px);
            box-shadow: 0 18px 34px rgba(162, 120, 145, 0.22);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes floatOrb {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(12px);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(8deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
