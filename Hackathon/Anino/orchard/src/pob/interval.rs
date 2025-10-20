use ff::Field;
use halo2_gadgets::utilities::lookup_range_check::LookupRangeCheckConfig;
use halo2_proofs::{
    circuit::{AssignedCell, Chip, Layouter, SimpleFloorPlanner, Value},
    plonk::{
        Advice, Circuit, Column, ConstraintSystem, Constraints, Error, Expression, Selector,
        TableColumn,
    },
    poly::Rotation,
};
use pasta_curves::Fp;

use crate::constants::sinsemilla::K;

#[derive(Clone, Debug)]
pub struct IntervalChipConfig {
    s_interval: Selector,
    a: Column<Advice>,
    b: Column<Advice>,
    c: Column<Advice>,
    table_idx: TableColumn,
    range_config: LookupRangeCheckConfig<Fp, K>,
}

impl IntervalChipConfig {}

pub struct IntervalChip {
    config: IntervalChipConfig,
}

impl Chip<Fp> for IntervalChip {
    type Config = IntervalChipConfig;

    type Loaded = ();

    fn config(&self) -> &Self::Config {
        &self.config
    }

    fn loaded(&self) -> &Self::Loaded {
        &()
    }
}

impl IntervalChip {
    pub fn configure(
        meta: &mut ConstraintSystem<Fp>,
        a: Column<Advice>,
        b: Column<Advice>,
        c: Column<Advice>,
        table_idx: TableColumn,
    ) -> IntervalChipConfig {
        meta.enable_equality(a);
        meta.enable_equality(b);
        meta.enable_equality(c);
        let s_interval = meta.selector();
        // low      | high        | element
        // 2^M      | y=high-low  | x=element - low
        // 2^M-y+x-1|
        meta.create_gate("<", |meta| {
            let s_interval = meta.query_selector(s_interval);
            let low = meta.query_advice(a.clone(), Rotation::cur());
            let high = meta.query_advice(b.clone(), Rotation::cur());
            let element = meta.query_advice(c.clone(), Rotation::cur());
            let pow2_m = meta.query_advice(a.clone(), Rotation::next());
            let y = meta.query_advice(b, Rotation::next());
            let x = meta.query_advice(c, Rotation::next());
            let x_shifted = meta.query_advice(a, Rotation(2));
            Constraints::with_selector(
                s_interval,
                [
                    y.clone() - high + low.clone(),
                    x.clone() - element + low,
                    x_shifted - (pow2_m - y + x) + Expression::Constant(Fp::one()),
                ],
            )
        });

        let range_config = LookupRangeCheckConfig::configure(meta, b, table_idx);

        IntervalChipConfig {
            s_interval,
            a,
            b,
            c,
            table_idx,
            range_config,
        }
    }

    pub fn construct(config: IntervalChipConfig) -> IntervalChip {
        IntervalChip { config }
    }

    pub fn load(
        &self,
        mut layouter: impl Layouter<Fp>,
        table_idx: TableColumn,
    ) -> Result<(), Error> {
        layouter.assign_table(
            || "table_idx",
            |mut table| {
                // We generate the row values lazily (we only need them during keygen).
                for index in 0..(1 << K) {
                    table.assign_cell(
                        || "table_idx",
                        table_idx,
                        index,
                        || Value::known(Fp::from(index as u64)),
                    )?;
                }
                Ok(())
            },
        )
    }

    pub fn check_in_interval(
        &self,
        mut layouter: impl halo2_proofs::circuit::Layouter<Fp>,
        e: AssignedCell<Fp, Fp>,
        low: AssignedCell<Fp, Fp>,
        high: AssignedCell<Fp, Fp>,
    ) -> Result<(), Error> {
        let m = NUM_WORDS * K;
        let config = &self.config;
        let (x, x_shifted) = layouter.assign_region(
            || "check interval",
            |mut region| {
                config.s_interval.enable(&mut region, 0)?;
                low.copy_advice(|| "low", &mut region, config.a, 0)?;
                high.copy_advice(|| "high", &mut region, config.b, 0)?;
                e.copy_advice(|| "e", &mut region, config.c, 0)?;
                let pow2_m = Fp::from(2).pow_vartime(&[m as u64]);
                let pow2_m = region.assign_advice_from_constant(|| "2^m", config.a, 1, pow2_m)?;
                let y = high.value().zip(low.value()).map(|(high, low)| high - low);
                let x = e.value().zip(low.value()).map(|(e, low)| e - low);
                let y = region.assign_advice(|| "y", config.b, 1, || y)?;
                let x = region.assign_advice(|| "x", config.c, 1, || x)?;
                let x_shifted = pow2_m
                    .value()
                    .zip(y.value())
                    .zip(x.value())
                    .map(|((pow2_m, y), x)| pow2_m - y + x - Fp::one());
                let x_shifted = region.assign_advice(|| "x_shifted", config.a, 2, || x_shifted)?;
                Ok((x, x_shifted))
            },
        )?;

        config
            .range_config
            .copy_check(layouter.namespace(|| "x < 2^M"), x, NUM_WORDS, true)?;
        config.range_config.copy_check(
            layouter.namespace(|| "x_shifted < 2^M"),
            x_shifted,
            NUM_WORDS,
            true,
        )?;

        Ok(())
    }
}

const NUM_WORDS: usize = 25;

#[derive(Clone)]
struct TestCircuitConfig {
    interval_config: IntervalChipConfig,
}

#[derive(Default)]
struct TestCircuit {
    x: Value<Fp>,
    a: Value<Fp>,
    b: Value<Fp>,
}

impl Circuit<Fp> for TestCircuit {
    type Config = TestCircuitConfig;

    type FloorPlanner = SimpleFloorPlanner;

    fn without_witnesses(&self) -> Self {
        Self::default()
    }

    fn configure(meta: &mut ConstraintSystem<Fp>) -> TestCircuitConfig {
        let x = meta.advice_column();
        let a = meta.advice_column();
        let b = meta.advice_column();
        let table_idx = meta.lookup_table_column();
        let f = meta.fixed_column();
        meta.enable_constant(f);
        let interval_config = IntervalChip::configure(meta, a, b, x, table_idx);
        TestCircuitConfig { interval_config }
    }

    fn synthesize(
        &self,
        config: TestCircuitConfig,
        mut layouter: impl Layouter<Fp>,
    ) -> Result<(), Error> {
        let interval_chip = IntervalChip::construct(config.interval_config.clone());
        interval_chip.load(
            layouter.namespace(|| "load lookup table"),
            config.interval_config.table_idx,
        )?;
        let (e, low, high) = layouter.assign_region(
            || "load witnesses",
            |mut region| {
                let e = region.assign_advice(|| "x", config.interval_config.a, 0, || self.x)?;
                let low = region.assign_advice(|| "a", config.interval_config.b, 0, || self.a)?;
                let high = region.assign_advice(|| "b", config.interval_config.c, 0, || self.b)?;
                Ok((e, low, high))
            },
        )?;
        interval_chip.check_in_interval(
            layouter.namespace(|| "check in interval"),
            e,
            low,
            high,
        )?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() -> Result<(), Error> {
        let test = TestCircuit {
            x: Value::known(Fp::from(12)),
            a: Value::known(Fp::from(10)),
            b: Value::known(Fp::from(12)),
        };

        let prover = halo2_proofs::dev::MockProver::run(11, &test, vec![])?;
        prover.verify().unwrap();

        Ok(())
    }
}
