"use client"
import { CalculatorIcon, CodeIcon, FlagIcon, LayersIcon, NodesIcon } from "../shared/icons";
import { useCycle } from "@/app/hooks/useCycle";
import { useInView } from "@/app/hooks/useInView";
import { FeatureCard } from "./FeatureCard";
import { styles } from "./features.styles";
import type { RoleBanksContent, RoleIconName } from "./features.types";

const ROLE_ICONS: Record<RoleIconName, typeof CodeIcon> = {
  code: CodeIcon,
  layers: LayersIcon,
  nodes: NodesIcon,
  calculator: CalculatorIcon,
  flag: FlagIcon,
};

export function RoleBanksCard({ title, subtitle, roles }: RoleBanksContent) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const activeIndex = useCycle(roles.length, 2200, inView);

  return (
    <FeatureCard title={title} subtitle={subtitle} cardRef={ref} className={styles.cardTall} animationDelay={0.35}>
      <ul className={styles.roles}>
        {roles.map((role, index) => {
          const Icon = ROLE_ICONS[role.icon];
          return (
            <li key={role.id} className={styles.role} data-active={index === activeIndex}>
              <span className={styles.roleIconBox}>
                <Icon className={styles.roleIcon} />
              </span>
              <div>
                <p className={styles.roleName}>{role.name}</p>
                <p className={styles.roleSkills}>{role.skills}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </FeatureCard>
  );
}
