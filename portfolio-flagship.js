document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER SYNC */
  gsap.registerPlugin(ScrollTrigger);

  let lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
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

  /* 2. REAL-TIME 3D WEBGL NETWORK TOPOLOGY (THREE.JS) */
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
      opacity: 0.08,
    });
    const wireMesh = new THREE.Mesh(icoGeo, wireMat);
    group.add(wireMesh);

    const particlesCount = 160;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 42;
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
      wireMesh.rotation.y += 0.0015;
      wireMesh.rotation.x += 0.0008;
      partMesh.rotation.y -= 0.0007;

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

  /* 3. KINETIC TYPOGRAPHY & CINEMATIC SCROLLYTELLING (GSAP) */
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    gsap.from('.word-reveal', {
      yPercent: 115,
      rotateZ: 3,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.15,
    });

    gsap.from('.reveal-up', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.45,
    });

    gsap.utils.toArray('.bento-tile, .evidence-panel').forEach((tile) => {
      gsap.from(tile, {
        scrollTrigger: {
          trigger: tile,
          start: 'top 88%',
        },
        y: 45,
        opacity: 0,
        duration: 0.85,
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

      [linkTrunk1, linkTrunk2, linkIsp, linkV30].forEach((l) => {
        if (l) {
          l.setAttribute('stroke', '#334155');
          l.setAttribute('stroke-width', '3');
        }
      });

      if (stepIndex === 1) {
        stageStatus.textContent = 'STAGE 01 // 802.1Q VLAN SEGMENTATION & LACP TRUNKS';
        stageCaption.textContent = 'VLANs 10, 20, 30, and 99 are logically isolated across SW1 and SW2 distribution trunks.';
        linkTrunk1?.setAttribute('stroke', '#38bdf8');
        linkTrunk2?.setAttribute('stroke', '#38bdf8');
      } else if (stepIndex === 2) {
        stageStatus.textContent = 'STAGE 02 // OSPF AREA 0 & VLSM SUBNETTING';
        stageCaption.textContent = 'R1-Core and R2-Edge exchange VLSM routes via OSPF Process 10 with passive-interface default enabled.';
        linkIsp?.setAttribute('stroke', '#22c55e');
        linkIsp?.setAttribute('stroke-width', '4');
      } else if (stepIndex === 3) {
        stageStatus.textContent = 'STAGE 03 // EXTENDED ACL PERIMETER ENFORCEMENT';
        stageCaption.textContent = 'Inbound Extended ACL on Gi0/0/0.30 blocks Guest VLAN 30 from probing HR (VLAN 20) or IT Mgmt (VLAN 99).';
        linkV30?.setAttribute('stroke', '#f43f5e');
        linkV30?.setAttribute('stroke-width', '4');
      }
    };

    steps.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => updateTopologyStage(stepNum),
        onEnterBack: () => updateTopologyStage(stepNum),
      });
    });
  }

  /* 4. CUSTOM CURSOR, MAGNETIC MICRO-INTERACTIONS & 3D TACTILE TILT */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' });
    });

    document.querySelectorAll('a, button, select, .bento-tile').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  }

  if (!prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      const strength = parseFloat(btn.getAttribute('data-strength') || '20');
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

        const rotateY = ((x / rect.width) - 0.5) * 6;
        const rotateX = ((y / rect.height) - 0.5) * -6;
        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }

  /* 5. LIVE INTERACTIVE ACL & WILDCARD PACKET SIMULATOR */
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
        simOutput.innerHTML = '<strong>[ACL DROP // DENIED]</strong> Matched ACE <code>10 deny ip 172.16.10.96 0.0.0.31 172.16.10.64 0.0.0.31 log</code> inbound on <code>Gi0/0/0.30</code>. Guest Wi-Fi cannot access HR/Finance.';
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

  const copyBtn = document.getElementById('copy-cli');
  const cliCode = document.getElementById('cli-code');
  if (copyBtn && cliCode) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cliCode.innerText);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy CLI'; }, 2000);
    });
  }

  /* 6. AI / MACHINE EXPERIENCE (MX) COMMAND PALETTE */
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
    goal: `> WORKSHEET SECTION 01: CAREER GOAL & SKILL AREA\n• Career Goal: Systems & Network Security Administrator.\n• Core Skill Area: Enterprise Networking & Perimeter Defense (OSPF, VLSM, 802.1Q VLANs, Extended ACLs).\n• Progression: Evolved from basic home router port-forwarding to architecting multi-subnet Cisco IOS topologies with least-privilege access control.`,
    aha: `> WORKSHEET SECTION 04: SIGNIFICANT LEARNING MOMENT ("AHA!" BREAKTHROUGH)\n• Realized why stateless Extended ACLs must be placed inbound closest to the traffic source (Gi0/0/0.30 in) rather than outbound.\n• Transitioned from memorizing wildcard subtraction to understanding binary 0 (match) and 1 (ignore) bit-level inspection.`,
    why: `> WORKSHEET SECTION 05: ENGINEERING ANALYSIS\n1. passive-interface default: Prevents OSPF Hello packets from leaking onto access VLANs where an attacker could spoof a neighbor adjacency.\n2. VLSM (/26, /27, /28, /30): Conserves 78% of IPv4 address space compared to flat /24 subnets.\n3. VTY SSH + access-class: Eliminates cleartext Telnet and restricts router management exclusively to VLAN 99 (172.16.99.0/28).`,
    business: `> WORKSHEET SECTION 06: BUSINESS BENEFIT\n• Blast-Radius Containment: Guest Wi-Fi cannot laterally probe HR/Finance servers.\n• High Availability: Dynamic OSPF routing + LACP EtherChannel eliminate single points of cable failure.\n• Audit Compliance: Explicit ACL logging ("log") provides forensic visibility into blocked packets.`,
    json: `> MACHINE EXPERIENCE (MX) STRUCTURED AGENT PAYLOAD:\n{\n  "candidate": "Oluwaseun (Bolu) Adalemo",\n  "program": "NSCC IT Systems Management & Security",\n  "artifact": "PPIT 2 Task C Portfolio Work Sample",\n  "skillsVerified": ["OSPFv2", "VLSM", "802.1Q Trunking", "Extended ACLs", "SSHv2 Hardening"],\n  "wasteReductionIPv4": "78%"\n}`
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
