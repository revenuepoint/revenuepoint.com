import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'how-anomaly-detection-actually-works',
  title:
    'How anomaly detection actually works: the methods behind an alert you can trust',
  excerpt:
    'Static thresholds don’t survive contact with real business metrics — the data has trend, seasonality, and noise. Here are the three algorithm families that do the actual work, and how we choose between them.',
  date: '2026-02-24',
  author: {
    name: 'Thomas Jones',
    role: 'Managing Director, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['Anomaly Detection', 'Monitoring', 'POV'],
  readingTime: '10 min read',
  cover: {
    src: '/img/insights/how-anomaly-detection-actually-works.svg',
    alt: 'A time series with a noise band; one point lifted above the band and labeled as the anomaly',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          Someone sets up a monitor: &ldquo;alert me when daily revenue drops
          below $X.&rdquo; The Monday after Thanksgiving, it fires. Every
          weekend, it fires. After the January discount promo, it fires. A
          month in, the alert gets muted. Six months later, revenue actually
          does fall off a cliff, and nobody notices for two weeks because the
          channel was already dead.
        </p>
        <p>
          This happens because static thresholds are the wrong tool for real
          business metrics. The data has shape — trend, cycles, noise — and
          a threshold treats all of it as the same number. What follows is
          how actual anomaly detection is done: the three algorithm families
          that handle the different shapes, the tradeoffs between them, and
          the layered approach we use so the alerts that reach a human are
          the ones worth reading.
        </p>

        <h2>What an &ldquo;anomaly&rdquo; actually is</h2>
        <p>
          The working definition we use: an anomaly is a value that doesn&apos;t
          fit the pattern the metric has been following. The pattern is built
          out of three ingredients, and every detector worth its salt is some
          way of subtracting them:
        </p>
        <ul>
          <li>
            <strong>Trend</strong> — the slow direction of travel. Revenue
            growing 2% a month. Support tickets drifting up as the customer
            base expands.
          </li>
          <li>
            <strong>Seasonality</strong> — the repeating cycles. Logins peak
            at 9 AM. Orders dip every weekend. Ad clicks fall every
            December 24th.
          </li>
          <li>
            <strong>Noise</strong> — the random jitter that&apos;s left over
            after you subtract trend and seasonality. Noise has a shape too:
            a scale (how jittery is this metric normally?) and a
            distribution (is it symmetric, or does it spike up more than
            down?).
          </li>
        </ul>
        <p>
          A real anomaly is a value the noise alone can&apos;t explain. Every
          technique below is a different way of asking that same question.
        </p>

        <h2>Family 1 — Rolling statistics (fast, no seasonality)</h2>
        <p>
          The simplest approach: keep a rolling window of recent values (the
          last 24 hours, the last 7 days), compute a center and a spread,
          and flag any new value that&apos;s too far from the center.
        </p>
        <p>
          The version that actually works in practice uses the{' '}
          <strong>median and the median absolute deviation (MAD)</strong>{' '}
          instead of mean and standard deviation. The reason is important:
          the mean is dragged around by every extreme value, so the first
          real anomaly poisons the detector and desensitizes it for days.
          The median and MAD barely move when one point goes crazy, which is
          exactly the behavior you want in a thing whose whole job is to
          notice when a point goes crazy.
        </p>
        <p>
          <strong>Strengths:</strong> reacts fast, runs cheap, works on
          metrics that don&apos;t have an obvious cycle (queue depth, error
          rate, free disk space).{' '}
          <strong>Weaknesses:</strong> completely blind to seasonality. Put
          it on a metric with a weekly pattern and it will flag every Monday
          morning as anomalous forever.
        </p>

        <h2>Family 2 — Seasonal decomposition (the workhorse)</h2>
        <p>
          Most business metrics have cycles. Orders, logins, ticket volume,
          page views, ad spend — all of them rise and fall on some
          predictable schedule. You cannot detect anomalies in these
          metrics directly; the cycle swamps the signal. You have to
          subtract the cycle first.
        </p>
        <p>
          That&apos;s what seasonal decomposition does. A technique called{' '}
          <strong>STL — Seasonal-Trend decomposition using Loess</strong>{' '}
          takes a time series and splits it into three pieces: a trend
          component (the slow drift), a seasonal component (the repeating
          cycle), and a residual (everything else). The detector goes on the
          residual, not on the raw series. A Monday-morning spike that
          matches every other Monday morning shows up in the seasonal
          component, not the residual. It is not an anomaly, because it was
          expected.
        </p>
        <p>
          The subtle part is that the seasonal component has to be{' '}
          <em>learned</em> from enough history. Weekly seasonality needs
          three or more weeks of data before the decomposition is stable;
          annual seasonality needs multiple years. A detector that&apos;s
          confidently reporting weekly anomalies on a two-week-old metric
          is guessing.
        </p>
        <p>
          <strong>Strengths:</strong> handles the huge class of business
          metrics that have a cycle.{' '}
          <strong>Weaknesses:</strong> slow to adapt to legitimate level
          shifts. If you launch a new product and daily orders jump 40%,
          seasonal decomposition will keep flagging the new baseline as
          anomalous for weeks until enough post-launch history accumulates.
        </p>

        <h2>Family 3 — Forecast-based (predicts, then compares)</h2>
        <p>
          The third approach inverts the problem. Instead of modeling what
          the past looked like and flagging points that don&apos;t fit,
          forecast a short distance into the future, build a prediction
          band around the forecast, and flag any actual value that lands
          outside the band.
        </p>
        <p>
          Classic tools here are <strong>SARIMA</strong> (seasonal
          autoregressive integrated moving average),{' '}
          <strong>Holt-Winters</strong> exponential smoothing, and{' '}
          <strong>Prophet</strong>. They all do broadly the same thing:
          learn trend + seasonality + uncertainty from history, produce a
          forecast, and widen the confidence band the further out they
          predict.
        </p>
        <p>
          The widening matters. It correctly encodes &ldquo;I&apos;m more
          confident about tomorrow than about next week,&rdquo; which means
          a surprise one day out is a much stronger signal than the same
          deviation a month out. You get severity for free: how many band
          widths outside the forecast is the actual value? That number is
          the z-score of the anomaly.
        </p>
        <p>
          <strong>Strengths:</strong> handles multi-layer seasonality
          (daily-inside-weekly-inside-annual), gives you severity scores
          natively, fits cleanly into a dashboard.{' '}
          <strong>Weaknesses:</strong> more compute than the others;
          sensitive to what&apos;s in the training window. Train it on a
          period containing a past outage and it will happily learn the
          outage as normal.
        </p>

        <h2>The tradeoff nobody tells you about — fast vs. stable</h2>
        <p>
          There is one decision baked into every anomaly detector, and it
          has no universally right answer: how quickly should the detector
          adapt to a new baseline?
        </p>
        <p>
          A <strong>fast-adapting</strong> detector handles legitimate
          level shifts well — a product launch, a pricing change, a new
          customer cohort. It also, unfortunately, adapts quickly to
          outages. If the metric crashes and stays crashed, a fast detector
          will decide the crashed value is the new normal in a few days and
          stop alerting.
        </p>
        <p>
          A <strong>stable</strong> detector holds its baseline. It will
          catch the long slow sag that a fast detector would have
          normalized. It will also flag every legitimate step change for
          weeks, until enough new history accumulates for the new level to
          become the baseline.
        </p>
        <p>
          The practical move is not to pick one. Run both. Treat their
          disagreement as information: when the fast detector says
          everything is fine and the stable detector is still firing, that
          is itself a thing worth knowing.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        A metric&apos;s seasonality is a feature of the data, not a setting
        in the dashboard. Detectors that don&apos;t learn it will wake you
        up every Monday.
      </PullQuote>

      <Prose>
        <h2>How we do it — a layered approach</h2>
        <p>
          We don&apos;t pick one algorithm per metric. We run a small
          ensemble in parallel, because each family catches a failure mode
          the others miss. The approach has six moving parts:
        </p>
        <ul>
          <li>
            <strong>Multiple detectors, one metric.</strong> A rolling-MAD
            detector, a seasonal-decomposition detector, and a forecast-band
            detector all score every point. Three independent looks at the
            same value.
          </li>
          <li>
            <strong>Severity, not booleans.</strong> Each detector emits a
            z-like score (how many &ldquo;noise units&rdquo; away from the
            expected value) rather than a fired/didn&apos;t-fire flag.
            Three moderate scores is often a stronger signal than one loud
            one.
          </li>
          <li>
            <strong>Learned seasonality.</strong> If three weeks of history
            show a weekly pattern, we use it. If they don&apos;t, we
            don&apos;t force a seasonal model on a metric that has no
            cycle. The default is to let the data tell us.
          </li>
          <li>
            <strong>Context on every firing.</strong> An anomaly without
            context is noise. Every firing carries: what other correlated
            metrics moved in the same window, what upstream jobs ran, what
            deploys or config changes happened nearby. That&apos;s the
            difference between an alert and a starting point.
          </li>
          <li>
            <strong>Grouping and deduplication.</strong> Five correlated
            metrics firing at 09:14 is one incident, not five alerts. An
            anomaly detector that doesn&apos;t group is an alert-fatigue
            generator.
          </li>
          <li>
            <strong>A feedback loop.</strong> Every alert a human marks
            &ldquo;not real&rdquo; tunes thresholds for that metric. Every
            alert marked &ldquo;should have fired sooner&rdquo; widens the
            window. The detector gets better by being used.
          </li>
        </ul>
        <p>
          In pseudo-code, the per-point logic looks roughly like this:
        </p>
      </Prose>

      <CodeBlock
        language="python"
        code={`def score(metric, value, history):
    # three independent views of "is this weird?"
    s_mad      = rolling_mad_zscore(value, history, window="7d")
    s_seasonal = stl_residual_zscore(value, history, period="weekly")
    s_forecast = forecast_band_zscore(value, model_for(metric))

    # combined severity (max, not average — any detector can raise the flag)
    severity = max(s_mad, s_seasonal, s_forecast)
    if severity < FIRING_THRESHOLD:
        return None  # quiet

    # enrich before anyone sees it
    context = {
        "correlated_metrics": find_correlated_movers(metric, window="30m"),
        "upstream_jobs":      recent_jobs(window="2h"),
        "deploys":            recent_deploys(window="2h"),
    }

    return Anomaly(metric, value, severity, scores=(s_mad, s_seasonal, s_forecast), context=context)`}
      />

      <Prose>
        <p>
          Three scores, one severity, context attached, grouping handled
          downstream. Nothing glamorous. The point is that each piece is
          doing a job the others can&apos;t.
        </p>

        <h2>One drop, three detectors</h2>
        <p>
          The cleanest way to see why the ensemble matters is to run a real
          drop through each detector and watch what happens.
        </p>
        <p>
          The metric is daily new support tickets. Mondays are normally a
          rebound from the weekend low. This particular Monday, tickets
          come in at about 60% of the usual Monday level.
        </p>
        <ul>
          <li>
            <strong>Static threshold</strong> (&ldquo;alert below 50
            tickets&rdquo;): silent. The Monday value is above 50. The
            threshold has no way to know Monday is supposed to be high.
          </li>
          <li>
            <strong>Rolling MAD alone</strong>: fires — but it also fires
            every weekend, so nobody pays attention when it fires on
            Monday either. Alert fatigue has already muted the channel.
          </li>
          <li>
            <strong>Seasonal decomposition</strong>: the weekly cycle
            predicted a Monday rebound. The residual shows a large
            negative value. Fires clearly, on the right day, for the right
            reason.
          </li>
          <li>
            <strong>Forecast band</strong>: the forecast expected a
            Monday-typical rebound. The actual value lands well below the
            lower bound. Fires with a severity score — roughly 3.8 band
            widths below expected — that tells the operator this is a
            meaningful drop, not a borderline one.
          </li>
        </ul>
        <p>
          The right anomaly got caught by the two right detectors. The
          wrong ones either stayed silent or had already trained the
          operator to ignore them. This is why the ensemble beats any
          single algorithm — each covers a blind spot the others have.
        </p>
      </Prose>

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400' preserveAspectRatio='none'%3E%3Crect width='800' height='400' fill='%23F5F7FA'/%3E%3Cg font-family='sans-serif' font-size='11' font-weight='700' fill='%23263445'%3E%3Ctext x='12' y='30'%3ERaw%3C/text%3E%3Ctext x='12' y='120'%3ETrend%3C/text%3E%3Ctext x='12' y='210'%3ESeasonal%3C/text%3E%3Ctext x='12' y='300'%3EResidual%3C/text%3E%3C/g%3E%3Cg stroke='%23D4DDE8' stroke-width='1'%3E%3Cline x1='90' y1='60'  x2='780' y2='60'/%3E%3Cline x1='90' y1='150' x2='780' y2='150'/%3E%3Cline x1='90' y1='240' x2='780' y2='240'/%3E%3Cline x1='90' y1='330' x2='780' y2='330'/%3E%3C/g%3E%3Cpath d='M90 55 L 140 30 L 190 45 L 240 20 L 290 42 L 340 18 L 390 48 L 440 22 L 490 72 L 540 20 L 590 40 L 640 18 L 690 42 L 740 24 L 780 38' fill='none' stroke='%238B0A39' stroke-width='1.8'/%3E%3Cpath d='M90 55 L 240 45 L 390 38 L 540 32 L 690 28 L 780 26' fill='none' stroke='%238B0A39' stroke-width='1.8'/%3E%3Cpath d='M90 150 L 115 130 L 140 165 L 165 135 L 190 160 L 215 132 L 240 162 L 265 135 L 290 158 L 315 132 L 340 160 L 365 135 L 390 158 L 415 132 L 440 160 L 465 132 L 490 160 L 515 132 L 540 158 L 565 135 L 590 160 L 615 132 L 640 160 L 665 135 L 690 158 L 715 132 L 740 160 L 765 135 L 780 145' fill='none' stroke='%238B0A39' stroke-width='1.6'/%3E%3Crect x='90' y='310' width='690' height='40' fill='none' stroke='%23D4DDE8' stroke-width='1' stroke-dasharray='4 3'/%3E%3Cpath d='M90 330 L 140 328 L 190 332 L 240 329 L 290 331 L 340 327 L 390 333 L 440 330 L 490 365 L 540 329 L 590 331 L 640 328 L 690 333 L 740 330 L 780 329' fill='none' stroke='%238B0A39' stroke-width='1.8'/%3E%3Ccircle cx='490' cy='365' r='5' fill='%238B0A39'/%3E%3Ctext x='500' y='370' font-family='sans-serif' font-size='11' font-weight='700' fill='%238B0A39'%3Eanomaly%3C/text%3E%3C/svg%3E"
        alt="Four-panel decomposition: raw series, trend, seasonal cycle, residual with one anomalous point highlighted outside the dashed band"
        caption="The same series, decomposed. Trend and seasonality explain most of the motion; anomalies live in the residual. The dashed band is the noise envelope."
        width={800}
        height={400}
      />

      <Figure
        src="/img/insights/anomaly-band-envelope.svg"
        alt="A time series with an expected band envelope; one residual point sits high above the band and is highlighted as the anomaly"
        caption="The same series, viewed against its expected band. The point lifted above the envelope is what every detector in the ensemble is, in its own way, trying to catch."
        width={1600}
        height={900}
      />

      <Callout variant="warning" title="Common mistakes">
        <p>
          The failure modes we see most often, roughly in order of how much
          damage they do:
        </p>
        <ul>
          <li>
            <strong>Mean and standard deviation instead of median and
            MAD.</strong> One outlier poisons the detector for days. The
            thing whose job is to catch outliers is the last thing that
            should be dragged around by them.
          </li>
          <li>
            <strong>Putting the detector on the raw series for a metric
            with obvious seasonality.</strong> Every Monday becomes an
            alert. Every Monday alert gets muted. The detector has trained
            its audience to ignore it.
          </li>
          <li>
            <strong>Training the forecast on a window that contains a
            prior incident.</strong> The model helpfully learns the outage
            as normal and the next outage looks unremarkable.
          </li>
          <li>
            <strong>Emitting booleans instead of severities.</strong> A
            3-sigma blip and a 15-sigma crash both render as &ldquo;fired.&rdquo;
            The operator has no way to triage.
          </li>
          <li>
            <strong>Never reviewing the false-positive rate.</strong> If
            the on-call rotation has a folklore rule like &ldquo;we always
            ignore the 9 AM alert,&rdquo; the detector has effectively
            stopped working and nobody&apos;s told it.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If your team has a rule like &ldquo;we ignore the Monday-morning
          alerts&rdquo; or &ldquo;we always mute the first alert after a
          deploy,&rdquo; you don&apos;t have an anomaly detector. You have
          a noise generator that your team has quietly learned to route
          around. Fix the detector; don&apos;t train the team to filter
          it.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about this at RevenuePoint</h2>
        <p>
          Anomaly detection isn&apos;t one algorithm done well. It&apos;s a
          small ensemble chosen for the shape of the data, running in
          parallel, emitting severity instead of booleans, grouped into
          incidents, and enriched with the context a human would otherwise
          have to dig for. Get that stack right and the alerts that reach a
          person are the ones worth reading — which is, in the end, the
          only definition of a useful alert.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
