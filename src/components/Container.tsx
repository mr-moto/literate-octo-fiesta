import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  element?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  innerClassName?: string;
};

export const Container: React.FunctionComponent<
  Props & HTMLAttributes<HTMLOrSVGElement>
> = ({ element: Wrapper = 'div', children, innerClassName, ...rest }) => {
  return (
    <Wrapper className={cn(rest.className)} {...rest}>
      <div className={cn('container', innerClassName)}>{children}</div>
    </Wrapper>
  );
};
