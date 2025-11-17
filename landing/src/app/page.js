const features = [
  {
    title: 'Smart bundle recipes',
    description: 'Pair frequently bought-together products using AI trained on Shopify analytics.',
  },
  {
    title: 'Real-time AI engine',
    description: 'Score bundles live as carts change during Black Friday surges.',
  },
  {
    title: 'Inventory aware',
    description: 'Blend sales lift with on-hand units so you never promote sold-out items.',
  },
];

const pricing = [
  {
    name: 'Free',
    price: '$0',
    highlight: 'Launch-ready tools',
    features: ['Up to 200 bundle calls / mo', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$99',
    highlight: 'Scale Black Friday',
    features: ['Unlimited bundle recipes', 'AI copy assistant', 'Priority chat support'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Talk to us',
    highlight: 'Custom playbooks',
    features: ['Dedicated CSM', 'Advanced inventory routing', 'SLA & custom contracts'],
  },
];

const faqs = [
  {
    question: 'Does this work with existing Shopify themes?',
    answer: 'Yes. Drop-in blocks for product, cart, and checkout integrate with any Online Store 2.0 theme.',
  },
  {
    question: 'How fast are the AI bundle recommendations?',
    answer: 'Latency averages under 300ms thanks to edge caching and lightweight bundle scoring.',
  },
  {
    question: 'What data powers the AI model?',
    answer: 'Only your store data. We blend order history, inventory, and merchandising tags with Supabase analytics.',
  },
  {
    question: 'Can I try this before Black Friday?',
    answer: 'Spin up a dev store and use the Free plan to preview bundles before upgrading.',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-brandBlack">
      <div className="absolute inset-0 gradient-ring opacity-60" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 md:px-10">
        <section className="grid gap-12 rounded-3xl bg-brandBlue px-8 py-14 text-white shadow-glow md:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200">New for Black Friday</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              AI Smart Bundler
            </h1>
            <p className="text-lg text-blue-100">
              Launch a full-stack Shopify app that recommends perfect bundles in real time. Built for high-volume
              stores heading into the biggest weekend of the year.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-white px-6 py-3 text-base font-medium text-brandBlue transition hover:translate-y-0.5"
              >
                View pricing
              </a>
              <a
                href="https://calendly.com"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
              >
                Book a demo
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Live bundle feed</p>
            <div className="mt-4 space-y-4">
              {['Premium Winter Set', 'Cart Add-on Trio', 'Inventory Saver Pack'].map((bundle) => (
                <div key={bundle} className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-base font-medium">{bundle}</p>
                  <p className="text-sm text-blue-100">+24% lift / <span className="text-white">Ready</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
                <p className="text-sm font-semibold text-brandBlue">{feature.title}</p>
                <p className="mt-3 text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-brandBlue">Pricing</p>
            <h2 className="text-3xl font-semibold">Choose a plan that unlocks bundle intelligence</h2>
            <p className="text-slate-600">Enterprise-grade security, responsive support, and instant deployment.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl border px-6 py-8 shadow-sm transition ${
                  tier.popular ? 'border-brandBlue bg-brandBlue text-white shadow-glow' : 'border-slate-200 bg-white'
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  {tier.popular ? 'Most popular' : tier.highlight}
                </p>
                <p className="mt-4 text-4xl font-semibold">{tier.price}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {tier.features.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brandBlue/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tier.popular
                      ? 'bg-white text-brandBlue'
                      : 'border border-brandBlue text-brandBlue hover:bg-brandBlue hover:text-white'
                  }`}
                >
                  {tier.name === 'Enterprise' ? 'Contact sales' : 'Start now'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-brandBlue">FAQ</p>
            <h2 className="text-3xl font-semibold">Everything you need to know</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-medium">{faq.question}</p>
                <p className="mt-3 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-brandBlue/20 bg-brandBlue/5 px-8 py-12 text-center">
          <h3 className="text-3xl font-semibold text-brandBlue">Ready to launch AI Smart Bundler?</h3>
          <p className="mt-3 text-slate-600">
            Install the app, connect Supabase or Firebase analytics, and deploy in under 10 minutes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a className="rounded-full bg-brandBlue px-6 py-3 text-white" href="https://shopify.com">Install now</a>
            <a className="rounded-full border border-brandBlue px-6 py-3 text-brandBlue" href="mailto:sales@example.com">
              Talk to sales
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
