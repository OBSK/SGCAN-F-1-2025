using StackExchange.Redis;

namespace APIGateway.Services
{
    public class RedisService
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisService(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public void SetValue(string key, string value)
        {
            var db = _redis.GetDatabase();
            db.StringSet(key, value);
        }

        public string GetValue(string key)
        {
            var db = _redis.GetDatabase();
            return db.StringGet(key).ToString() ?? string.Empty;
        }
    }
}
