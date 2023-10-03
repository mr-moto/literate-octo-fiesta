import { cn } from '@/utils/cn';

import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  element?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  innerClassName?: string;
  fullWidth?: boolean;
};

export const Container: React.FunctionComponent<
  Props & HTMLAttributes<HTMLOrSVGElement>
> = ({
  element: Wrapper = 'div',
  fullWidth = false,
  children,
  innerClassName,
  ...rest
}) => {
  return (
    <Wrapper className={cn(rest.className)} {...rest}>
      <div className={cn(!fullWidth && 'container', innerClassName)}>
        {children}
      </div>
    </Wrapper>
  );
};
