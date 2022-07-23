import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPaginationQuery } from 'src/app/interfaces';

export const ParamsHandler = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let { $rpp, $page, $orderBy, $filter } = request.query;
    $rpp = +$rpp;
    $page = +$page;
    $orderBy = $orderBy ? sortArrayToObject($orderBy) : { created_at: -1 };
    $filter = $filter ? queryArrayToObjects($filter) : { is_enable: true };
    const pagination: IPaginationQuery = { $rpp, $page, $orderBy, $filter };
    return pagination;
  },
);

export const GetDigit = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      digit: request.body.Digits,
      from: request.body.Caller,
      call_sid: request.body.CallSid,
    };
  },
);

// Sorting & Filteration Methods
const sortArrayToObject = ($orderBy: string): Object => {
  const differentSortings: string[] = $orderBy.split(',');
  const result: Object = {};
  differentSortings.forEach((sort) => {
    const [field, operator] = sort.split(' ');
    if (operator === 'asc') result[field] = 1;
    if (operator === 'desc') result[field] = -1;
  });
  return result;
};
const queryArrayToObjects = ($filter: string): Object => {
  // identifying operator: and/or & separating filters into [filters:string] or [filter:string]
  const opr = $filter.includes(' or ')
    ? ' or '
    : $filter.includes(' and ')
    ? ' and '
    : undefined;
  const filters: string[] = opr ? $filter.split(opr) : [$filter];
  // creating [filters:Object] or [filter:Object]
  const filterObjects: Object[] = filters.map((filter) => {
    const [field, operator, ...valueArray] = filter.split(' ');
    const value = valueArray.join(' ');
    const obj = {};
    if (operator.trim() === 'like') {
      obj[field] = {
        $regex: '.*' + value.trim() + '.*',
        $options: 'i',
      };
    } else if (operator.trim() === 'in') {
      obj[field] = { [`$${operator}`]: value.split(',') };
    } else {
      obj[field] = { [`$${operator}`]: value };
    }
    return obj;
  });
  const result = opr ? { [`$${opr.trim()}`]: filterObjects } : filterObjects[0];
  if (!$filter.includes('is_enable')) {
    result['is_enable'] = true;
  }
  return result;
};
