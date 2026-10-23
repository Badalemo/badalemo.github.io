/* ==========================================================================
   FLAGSHIP MOTION & INTERACTION ENGINE — portfolio-flagship.js
   Libraries: Three.js (WebGL), GSAP + ScrollTrigger, Lenis Smooth Scroll
   Includes: Multi-Tab Evidence Switcher, Project Category Filter, 4-Phase
   Scrollytelling, 3D Tilt, Magnetic Buttons, ACL Simulator & MX Agent
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER SYNC
     -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  let lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* --------------------------------------------------------------------------
     2. REAL-TIME 3D WEBGL NETWORK TOPOLOGY (THREE.JS)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('webgl-canvas');
  if (canvas && !prefersReducedMotion && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const icoGeo = new THREE.IcosahedronGeometry(11, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.075,
    });
    const wireMesh = new THREE.Mesh(icoGeo, wireMat);
    group.add(wireMesh);

    const particlesCount = 180;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 44;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.55,
    });
    const partMesh = new THREE.Points(partGeo, partMat);
    group.add(partMesh);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animateWebGL = () => {
      requestAnimationFrame(animateWebGL);
      wireMesh.rotation.y += 0.0014;
      wireMesh.rotation.x += 0.0007;
      partMesh.rotation.y -= 0.0006;

      group.rotation.y += (mouseX * 0.35 - group.rotation.y) * 0.04;
      group.rotation.x += (mouseY * 0.25 - group.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };
    animateWebGL();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* --------------------------------------------------------------------------
     3. KINETIC TYPOGRAPHY & 4-PHASE CINEMATIC SCROLLYTELLING (GSAP)
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    gsap.from('.word-reveal', {
      yPercent: 115,
      rotateZ: 3,
      opacity: 0,
      duration: 1.05,
      stagger: 0.11,
      ease: 'power4.out',
      delay: 0.12,
    });

    gsap.from('.reveal-up', {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.4,
    });

    gsap.utils.toArray('.bento-tile, .evidence-panel').forEach((tile) => {
      gsap.from(tile, {
        scrollTrigger: {
          trigger: tile,
          start: 'top 89%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    const steps = document.querySelectorAll('.step-card');
    const stageStatus = document.getElementById('stage-status');
    const stageCaption = document.getElementById('stage-caption');

    const updateTopologyStage = (stepIndex) => {
      steps.forEach((s) => s.classList.remove('active-step'));
      if (steps[stepIndex - 1]) steps[stepIndex - 1].classList.add('active-step');

      const linkTrunk1 = document.getElementById('link-trunk1');
      const linkTrunk2 = document.getElementById('link-trunk2');
      const linkIsp = document.getElementById('link-isp');
      const linkV30 = document.getElementById('link-v30');
      const linkV99 = document.getElementById('link-v99');

      [linkTrunk1, linkTrunk2, linkIsp, linkV30, linkV99].forEach((l) => {
        if (l) {
          l.setAttribute('stroke', '#334155');
          l.setAttribute('stroke-width', '3');
        }
      });

      if (stepIndex === 1) {
        stageStatus.textContent = 'PHASE 01 // 802.1Q VLAN SEGMENTATION & LACP TRUNKS';
        stageCaption.textContent = 'VLANs 10 (Eng), 20 (HR/SQL), 30 (Guest), and 99 (IT Mgmt) are isolated across SW1 and SW2 distribution trunks.';
        linkTrunk1?.setAttribute('stroke', '#38bdf8');
        linkTrunk2?.setAttribute('stroke', '#38bdf8');
      } else if (stepIndex === 2) {
        stageStatus.textContent = 'PHASE 02 // OSPFv2 AREA 0 & VLSM 78% CONSERVATION';
        stageCaption.textContent = 'R1-Core and R2-Edge exchange VLSM routes (/26, /27, /28, /30) via OSPF Process 10 with passive-interface default.';
        linkIsp?.setAttribute('stroke', '#22c55e');
        linkIsp?.setAttribute('stroke-width', '4');
      } else if (stepIndex === 3) {
        stageStatus.textContent = 'PHASE 03 // EXTENDED ACL PERIMETER & SSHv2 LOCK';
        stageCaption.textContent = 'Inbound Extended ACL on Gi0/0/0.30 blocks Guest VLAN 30 from probing HR (VLAN 20) or IT Mgmt (VLAN 99).';
        linkV30?.setAttribute('stroke', '#f43f5e');
        linkV30?.setAttribute('stroke-width', '4');
      } else if (stepIndex === 4) {
        stageStatus.textContent = 'PHASE 04 // SYSTEMS, AD DS, DOCKER VPN & PROD WEB';
        stageCaption.textContent = 'VLAN 99 Admin plane manages Linux (oadalemo), Windows AD DS/GPO, Docker Gluetun VPN, AFACS.org & Foodeal.';
        linkV99?.setAttribute('stroke', '#a855f7');
        linkV99?.setAttribute('stroke-width', '4');
        linkIsp?.setAttribute('stroke', '#38bdf8');
      }
    };

    steps.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        end: 'bottom 38%',
        onEnter: () => updateTopologyStage(stepNum),
        onEnterBack: () => updateTopologyStage(stepNum),
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. MULTI-TAB EVIDENCE LAB & PROJECT CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const evTabs = document.querySelectorAll('.ev-tab');
  const evPanes = document.querySelectorAll('.ev-pane');

  evTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      evTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      evPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectItems.forEach((item) => {
        const cats = item.getAttribute('data-category') || '';
        if (filter === 'all' || cats.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. CUSTOM CURSOR, MAGNETIC MICRO-INTERACTIONS & 3D TACTILE TILT
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && !prefersReducedMotion && typeof gsap !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' });
    });

    document.querySelectorAll('a, button, select, .bento-tile').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  }

  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      const strength = parseFloat(btn.getAttribute('data-strength') || '18');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = ((y / rect.height) - 0.5) * -5;
        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 950,
          duration: 0.35,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. LIVE INTERACTIVE ACL & WILDCARD PACKET SIMULATOR + CLIPBOARD
     -------------------------------------------------------------------------- */
  const simRun = document.getElementById('sim-run');
  const simSrc = document.getElementById('sim-src');
  const simDst = document.getElementById('sim-dst');
  const simOutput = document.getElementById('sim-output');

  if (simRun && simSrc && simDst && simOutput) {
    simRun.addEventListener('click', () => {
      const src = simSrc.value;
      const dst = simDst.value;

      if (src === 'guest' && dst === 'hr') {
        simOutput.className = 'sim-result deny';
        simOutput.innerHTML = '<strong>[ACL DROP // DENIED]</strong> Matched ACE <code>10 deny ip 172.16.10.96 0.0.0.31 172.16.10.64 0.0.0.31 log</code> inbound on <code>Gi0/0/0.30</code>. Guest Wi-Fi cannot access HR/Finance SQL servers.';
      } else if (src === 'guest' && dst === 'ssh') {
        simOutput.className = 'sim-result deny';
        simOutput.innerHTML = '<strong>[ACL DROP // DENIED]</strong> Blocked by both <code>RESTRICT-GUEST</code> (ACE 20) and VTY <code>access-class VTY-ADMIN-ONLY</code>. Unauthorized SSH attempt logged.';
      } else if (src === 'eng' && dst === 'ssh') {
        simOutput.className = 'sim-result deny';
        simOutput.innerHTML = '<strong>[VTY DROP // DENIED]</strong> Engineering (<code>172.16.10.14</code>) does not match VTY wildcard <code>172.16.99.0 0.0.0.15</code>. Only VLAN 99 can SSH into R1-Core.';
      } else if (src === 'mgmt' && dst === 'ssh') {
        simOutput.className = 'sim-result permit';
        simOutput.innerHTML = '<strong>[PERMITTED // SSHv2 ESTABLISHED]</strong> Source <code>172.16.99.5</code> matches standard ACL <code>permit 172.16.99.0 0.0.0.15</code> on <code>line vty 0 4</code>.';
      } else {
        simOutput.className = 'sim-result permit';
        simOutput.innerHTML = '<strong>[PERMITTED // ROUTED VIA OSPF]</strong> Matched ACE <code>30 permit ip any any</code>. Packet forwarded via OSPF Area 0 next-hop <code>172.16.254.2</code>.';
      }
    });
  }

  document.querySelectorAll('.btn-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return;
      const temp = document.createElement('textarea');
      temp.value = codeEl.innerText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      const original = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = original; }, 2000);
    });
  });

  /* --------------------------------------------------------------------------
     7. AI / MACHINE EXPERIENCE (MX) COMMAND PALETTE
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('agent-modal');
  const trigger = document.getElementById('cmd-trigger');
  const closeBtn = document.getElementById('agent-close');
  const closeBg = document.getElementById('agent-close-bg');
  const agentResp = document.getElementById('agent-response');

  const toggleModal = (open) => {
    if (!modal) return;
    modal.classList.toggle('open', open);
    modal.setAttribute('aria-hidden', !open);
  };

  trigger?.addEventListener('click', () => toggleModal(true));
  closeBtn?.addEventListener('click', () => toggleModal(false));
  closeBg?.addEventListener('click', () => toggleModal(false));

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleModal(!modal?.classList.contains('open'));
    } else if (e.key === 'Escape') {
      toggleModal(false);
    }
  });

  const responses = {
    goal: `> WORKSHEET ITEM 01 & 02: CAREER GOAL & CORE SKILL AREA
• Career Goal: Systems & Network Security Administrator (Bateman, 2013).
• Core Skill Area: Enterprise Networking, Systems Administration & Perimeter Defense (Rouse, n.d.).
• Real-World Synthesis: Unites NSCC Cisco IOS/Linux/Windows Server mastery with production SSH & SQL administration for AFACS.org and Foodeal.`,
    curriculum: `> NSCC IT SYSTEMS MANAGEMENT & SECURITY CURRICULUM + CVE RESEARCH
• Networking: OSPFv2 (passive-interface default), VLSM (78% IPv4 savings), 802.1Q Router-on-a-Stick, LACP EtherChannel, STP, Extended ACLs, SSHv2 VTY hardening.
• Systems Admin: Linux CLI (user: oadalemo, systemd, Bash, SSH hardening) & Windows Server (Active Directory Domain Services, GPOs, DNS, DHCP).
• Cybersecurity Research: Investigated Cisco Catalyst SD-WAN Manager API flaw (CVE-2026-76504) and authored management-plane shielding ACLs.`,
    projects: `> PRODUCTION FULL-STACK, SYSTEMS & ENTREPRENEURSHIP PORTFOLIO
1. AFACS.org: Lead Developer managing production servers via SSH, SQL databases, PHP/Node.js backend, and full UI/UX updates.
2. Foodeal: Engineered the backend membership program, user settings API, and relational SQL schema.
3. Express Your Essence (E.Y.E): Co-founded with Jordane Foffe; built with Shopify CLI & Liquid; won 2nd Place at DBBSA Pitch Competition (Mar 2026) & completed Dal Innovates Collide Validate (Mar 2026).
4. Additional Apps: Spotify Family Manager (Firebase Auth/DB), PrivacyPal Suite, and Bube's Food Rush.`,
    aha: `> WORKSHEET ITEM 05 & 06: THE "AHA!" BREAKTHROUGH & CRITICAL ANALYSIS
• Breakthrough: Visualized the stateless router packet pipeline—placing Extended ACLs inbound closest to the source (Gi0/0/0.30 in) and mastering binary wildcard inversion (0 = match, 1 = ignore).
• Future Hardening: Upgrade stateless ACLs to a Zone-Based Policy Firewall (ZBPF) and enable DHCP Snooping + Dynamic ARP Inspection (DAI).`,
    tutoring: `> TECHNICAL MENTORSHIP, SELF-HOSTED LAB & COMMUNITY LEADERSHIP
• Python Guides & Tutoring: Published Notion Python guides (2,600+ views, 860+ downloads) and provide 1-on-1 CS/coding tutoring in Halifax.
• Home Media & VPN Server: Docker stack (Jellyfin, Sonarr, Prowlarr, qBittorrent) routed through a Gluetun VPN kill-switch and Tailscale mesh.
• Community & Awards: BGC Greater Halifax Clubs (Spryfield) Program Staff, Parker Street Food Bank volunteer, Halifax West CS Award (2025), 3rd Place JA Nigeria.`,
    json: `> MACHINE EXPERIENCE (MX) STRUCTURED AGENT PAYLOAD:
{
  "candidate": "Oluwaseun (Bolu) Adalemo",
  "institution": "NSCC Institute of Technology (Halifax, NS)",
  "program": "IT Systems Management & Security",
  "productionSystems": ["afacs.org (SSH/SQL/Node/PHP/UI)", "Foodeal (Membership & Settings Backend)", "E.Y.E (Shopify CLI/Liquid)"],
  "infrastructure": ["Cisco IOS OSPF/VLSM/ACL", "Linux (oadalemo)", "Windows Server AD DS/GPO", "Docker + Gluetun VPN + Tailscale"],
  "cveResearch": "CVE-2026-76504 (Cisco Catalyst SD-WAN Manager API)",
  "honors": ["2nd Place DBBSA Pitch 2026", "Dal Innovates Collide Validate 2026", "2,600+ Python Guide Views"]
}`
  };

  document.querySelectorAll('.prompt-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-q');
      if (agentResp && responses[key]) {
        agentResp.textContent = responses[key];
      }
    });
  });
});
