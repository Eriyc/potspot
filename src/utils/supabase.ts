import {createClient} from '@supabase/supabase-js';

const url = 'https://fwrvehmsgivqnzyggwbt.supabase.co';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTQyNjYzMSwiZXhwIjoxOTQxMDAyNjMxfQ.i3szYZ0r92Yb91WJQ-BCpHLR7ZDCsXxTYK_V8VJ4do8';

export const supabase = createClient(url, key);
