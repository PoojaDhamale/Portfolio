/* ═══════════════════════════════════════════════════
   POOJA DHAMALE — PORTFOLIO JS
   Scroll Effects · Animations · Interactions
   Web3Forms Contact Form
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────
     NAVBAR — Scroll Effect + Active Section
     ──────────────────────────────────────────────── */

  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  if (navbar) {

    const updateNavbar = () => {

      /* Navbar background */
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      /* Active navigation link */
      let currentSection = '';

      sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
        }

      });

      navLinks.forEach(link => {

        link.classList.remove('active');

        if (
          currentSection &&
          link.getAttribute('href') === `#${currentSection}`
        ) {
          link.classList.add('active');
        }

      });

    };

    window.addEventListener('scroll', updateNavbar, {
      passive: true
    });

    /* Run once on page load */
    updateNavbar();

  }


  /* ────────────────────────────────────────────────
     MOBILE NAVIGATION MENU
     ──────────────────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (navToggle && navMenu) {

    navToggle.addEventListener('click', () => {

      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');

      const isOpen =
        navMenu.classList.contains('open');

      navToggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

    });


    /* Close menu after clicking a navigation link */
    navLinks.forEach(link => {

      link.addEventListener('click', () => {

        navToggle.classList.remove('active');
        navMenu.classList.remove('open');

        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }


  /* ────────────────────────────────────────────────
     SCROLL REVEAL ANIMATIONS
     ──────────────────────────────────────────────── */

  const revealElements = document.querySelectorAll(
    '.about-content, ' +
    '.edu-card, ' +
    '.project-left, ' +
    '.project-right, ' +
    '.skill-category, ' +
    '.cert-card, ' +
    '.contact-form-card, ' +
    '.contact-info-panel, ' +
    '.reveal'
  );


  if (
    revealElements.length &&
    'IntersectionObserver' in window
  ) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');


          /* Stagger child elements */
          const staggerChildren =
            entry.target.querySelectorAll(
              '.stagger-child'
            );


          staggerChildren.forEach((child, index) => {

            setTimeout(() => {

              child.classList.add('visible');

            }, index * 150);

          });


          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    /* Fallback for browsers without IntersectionObserver */

    revealElements.forEach(element => {

      element.classList.add('visible');

    });

  }


  /* ────────────────────────────────────────────────
     PROJECT CARDS
     Outcomes + Technology Pills Animation
     ──────────────────────────────────────────────── */

  const projectCards =
    document.querySelectorAll('.project-card');


  if (
    projectCards.length &&
    'IntersectionObserver' in window
  ) {

    const projectObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const card = entry.target;


          /* Animate outcome boxes */

          const outcomes =
            card.querySelectorAll('.outcome-box');


          outcomes.forEach((box, index) => {

            setTimeout(() => {

              box.classList.add('visible');

            }, 300 + index * 150);

          });


          /* Animate technology pills */

          const pills =
            card.querySelectorAll('.tech-pill');


          pills.forEach((pill, index) => {

            setTimeout(() => {

              pill.classList.add('visible');

            }, 700 + index * 80);

          });


          observer.unobserve(card);

        });

      },
      {
        threshold: 0.15
      }
    );


    projectCards.forEach(card => {

      projectObserver.observe(card);

    });

  }


  /* ────────────────────────────────────────────────
     CERTIFICATIONS
     Card Cascade Animation
     ──────────────────────────────────────────────── */

  const certsGrid =
    document.querySelector('.certs-grid');


  if (
    certsGrid &&
    'IntersectionObserver' in window
  ) {

    const certObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const cards =
            entry.target.querySelectorAll(
              '.cert-card'
            );


          cards.forEach((card, index) => {

            setTimeout(() => {

              card.classList.add('visible');

            }, index * 180);

          });


          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.1
      }
    );


    certObserver.observe(certsGrid);

  }


  /* ────────────────────────────────────────────────
     CERTIFICATION CARD — SUBTLE 3D TILT
     Desktop Only
     ──────────────────────────────────────────────── */

  const certificationCards =
    document.querySelectorAll('.cert-card');


  if (window.matchMedia('(pointer: fine)').matches) {

    certificationCards.forEach(card => {

      card.addEventListener('mousemove', event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        if (!centerX || !centerY) return;


        const rotateX =
          ((y - centerY) / centerY) * -3;

        const rotateY =
          ((x - centerX) / centerX) * 3;


        card.style.transform =
          `perspective(700px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;

      });


      card.addEventListener('mouseleave', () => {

        card.style.transform =
          'perspective(700px) ' +
          'rotateX(0deg) ' +
          'rotateY(0deg) ' +
          'translateY(0)';

      });

    });

  }


  /* ────────────────────────────────────────────────
     CONTACT FORM
     Web3Forms Submission
     ──────────────────────────────────────────────── */

  const contactForm =
    document.getElementById('contactForm');


  if (contactForm) {

    /* ──────────────────────────────────────────────
       CONTACT FORM — VISUAL ANIMATION
       ────────────────────────────────────────────── */

    const contactCard =
      document.querySelector('.contact-form-card');


    if (
      contactCard &&
      'IntersectionObserver' in window
    ) {

      const contactObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(entry => {

              if (!entry.isIntersecting) return;


              const formGroups =
                entry.target.querySelectorAll(
                  '.form-group'
                );


              /* Animate field underlines */

              formGroups.forEach((group, index) => {

                setTimeout(() => {

                  const underline =
                    group.querySelector(
                      '.underline'
                    );


                  if (!underline) return;


                  underline.style.width = '100%';


                  setTimeout(() => {

                    underline.style.width = '0';

                  }, 600);

                }, index * 250);

              });


              /* Pulse send button */

              setTimeout(() => {

                const sendButton =
                  entry.target.querySelector(
                    '.btn-send'
                  );


                if (sendButton) {

                  sendButton.classList.add(
                    'pulse'
                  );

                }

              }, formGroups.length * 250 + 300);


              observer.unobserve(entry.target);

            });

          },
          {
            threshold: 0.3
          }
        );


      contactObserver.observe(contactCard);

    }


    /* ──────────────────────────────────────────────
       WEB3FORMS — ACTUAL FORM SUBMISSION
       ────────────────────────────────────────────── */

    contactForm.addEventListener(
      'submit',
      async event => {

        event.preventDefault();


        const submitButton =
          document.getElementById(
            'contactSubmit'
          );


        const submitText =
          document.getElementById(
            'contactSubmitText'
          );


        const status =
          document.getElementById(
            'contactStatus'
          );


        /* Reset previous status */

        if (status) {

          status.textContent = '';
          status.className =
            'contact-status';

        }


        /* Disable button */

        if (submitButton) {

          submitButton.disabled = true;

        }


        if (submitText) {

          submitText.textContent =
            'Sending...';

        }


        try {

          /*
           * FormData automatically collects:
           * name
           * email
           * visitor_subject
           * message
           * access_key
           * Web3Forms hidden fields
           */

          const formData =
            new FormData(contactForm);


          const response =
            await fetch(
              'https://api.web3forms.com/submit',
              {
                method: 'POST',
                body: formData
              }
            );


          const result =
            await response.json();


          if (
            result.success === true
          ) {

            /* ─────────────────────────────
               SUCCESS
               ───────────────────────────── */

            if (status) {

              status.textContent =
                'Thank you! Your message has been sent successfully.';

              status.classList.add(
                'success'
              );

            }


            if (submitText) {

              submitText.textContent =
                'Message Sent ✓';

            }


            /* Clear form */

            contactForm.reset();


            /* Remove button pulse */

            if (submitButton) {

              submitButton.classList.remove(
                'pulse'
              );

            }


            /* Restore button after delay */

            setTimeout(() => {

              if (submitText) {

                submitText.textContent =
                  'Send Message';

              }

              if (status) {

                status.textContent = '';

                status.className =
                  'contact-status';

              }

              if (submitButton) {

                submitButton.disabled = false;

              }

            }, 5000);

          } else {

            throw new Error(
              result.message ||
              'Unable to send message.'
            );

          }

        } catch (error) {

          console.error(
            'Web3Forms Error:',
            error
          );


          /* ─────────────────────────────
             ERROR
             ───────────────────────────── */

          if (status) {

            status.textContent =
              'Sorry, something went wrong. Please try again or email me directly.';

            status.classList.add(
              'error'
            );

          }


          if (submitText) {

            submitText.textContent =
              'Try Again';

          }


          if (submitButton) {

            submitButton.disabled = false;

          }

        }

      }
    );

  }


  /* ────────────────────────────────────────────────
     SMOOTH SCROLL
     ──────────────────────────────────────────────── */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener(
        'click',
        function (event) {

          const targetId =
            this.getAttribute('href');


          /* Ignore empty "#" links */

          if (
            !targetId ||
            targetId === '#'
          ) {
            return;
          }


          let target = null;


          try {

            target =
              document.querySelector(
                targetId
              );

          } catch (error) {

            console.warn(
              'Invalid navigation target:',
              targetId
            );

            return;

          }


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }
      );

    });


  /* ────────────────────────────────────────────────
     SKILLS — STAGGERED CARD ANIMATION
     ──────────────────────────────────────────────── */

  const skillsGrid =
    document.querySelector('.skills-grid');


  if (
    skillsGrid &&
    'IntersectionObserver' in window
  ) {

    const skillObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;


            const cards =
              entry.target.querySelectorAll(
                '.skill-category'
              );


            cards.forEach((card, index) => {

              setTimeout(() => {

                card.classList.add(
                  'visible'
                );

              }, index * 120);

            });


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.1
        }
      );


    skillObserver.observe(
      skillsGrid
    );

  }


  /* ────────────────────────────────────────────────
     LUCIDE ICONS
     ──────────────────────────────────────────────── */

  if (typeof lucide !== 'undefined') {

    lucide.createIcons();

  }

});