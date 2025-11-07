import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="space-y-20 pb-24 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=80"
            alt="Urban studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-6 px-6 py-24 text-white">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-max rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.5em]">
            The Urban Manifesto
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Crafted for the restless generation redefining city style.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl text-sm text-white/80">
            Urban Store was born off late-night sessions in a downtown loft—sketchbooks spread across the floor, playlists looping on tape decks,
            and a shared belief that menswear could free movement instead of restrict it. We obsess over textiles, modular panels, and hidden utility,
            but we’re ultimately chasing that electric spark you feel when an outfit mirrors your energy.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4">
            <Button asChild className="rounded-full bg-[#FF6600] px-6 text-white hover:bg-[#ff7a26]">
              <Link to="/shop">Shop the Drop</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full border border-white/30 px-6 py-2 text-white hover:bg-white/10">
              <Link to="/contact">Press & Collaborations</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-6">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Why We Started',
              copy:
                'City life moves at double speed. We wanted a wardrobe that could keep up—fluid between day and night, intentional yet effortless. Urban Store merges performance fabrics, sustainable sourcing, and bold silhouettes to arm the modern creative.'
            },
            {
              title: 'How We Build',
              copy:
                'Every piece is prototyped across real commutes: biking, rehearsing, grabbing midnight ramen. We partner with ethical mills in Portugal and Japan, use recycled trims, and produce in small batches to reduce waste and overstock.'
            },
            {
              title: 'Community First',
              copy:
                'The brand is a conversation. From pop-up workshops to collaborative capsules, we invite stylists, DJs, dancers, and activists to co-create collections that reflect their narratives—not just ours.'
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-[28px] border border-amber-500/40 bg-white/70 p-8 backdrop-blur-xl shadow-[0_18px_60px_rgba(148,89,16,0.15)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-amber-900">{card.title}</h2>
              <p className="mt-4 text-sm text-amber-900/80">{card.copy}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-8 rounded-[32px] border border-amber-500/30 bg-white/80 p-10 backdrop-blur-xl md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-800/80">Ethos</span>
            <h2 className="text-3xl font-semibold tracking-tight text-amber-900">Intentional drops with transparent craftsmanship.</h2>
            <p className="text-sm text-amber-900/80">
              From recycled nylon windbreakers to organic cotton jerseys, each release is mapped against a lifecycle plan. We disclose fabric origins, factory partners, and carbon offsets because daylight builds trust. Limited quantities keep the pieces special—and minimize environmental impact.
            </p>
            <div className="grid gap-3 text-sm text-amber-900/90 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-100/70 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-900/70">Materials</p>
                <p className="mt-2 font-semibold">60% recycled fibers, 100% traceable.</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-100/70 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-900/70">Partners</p>
                <p className="mt-2 font-semibold">Family-run ateliers in Lisbon & Osaka.</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-100/70 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-900/70">Production</p>
                <p className="mt-2 font-semibold">Small batches, quarterly drops.</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-100/70 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-900/70">Initiatives</p>
                <p className="mt-2 font-semibold">1% of profits funds youth creative hubs.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-amber-500/40">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
              alt="Studio"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent" />
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-amber-900">Timeline</h2>
          <div className="grid gap-6 text-left sm:grid-cols-3">
            {[
              { year: '2018', detail: 'Launched the first capsule “Night Shift” from a Brooklyn loft.' },
              { year: '2020', detail: 'Introduced recycled nylon parkas and modular cargo program.' },
              { year: '2023', detail: 'Opened the Urban Lab pop-up—workshops, DJ sets, and limited drops.' },
            ].map((item) => (
              <div key={item.year} className="rounded-2xl border border-amber-500/30 bg-white/70 p-5">
                <p className="text-sm uppercase tracking-[0.4em] text-amber-900/60">{item.year}</p>
                <p className="mt-2 text-sm text-amber-900/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 rounded-[28px] border border-amber-500/40 bg-white/80 p-10 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-semibold tracking-tight text-amber-900">Join the movement</h3>
          <p className="mt-4 text-sm text-amber-900/80">
            Collaborators, stylists, photographers, and performers—we want to hear your perspective. Let’s build the next drop together.
          </p>
          <Button asChild className="mt-6 rounded-full bg-[#FF6600] px-6 text-white hover:bg-[#ff7a26]">
            <Link to="/contact">Pitch a collaboration</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

