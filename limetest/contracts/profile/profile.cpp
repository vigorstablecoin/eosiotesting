#include "eosio/eosio.hpp"


class [[eosio::contract]] profile: public eosio::contract {

public:

  profile(eosio::name receiver, eosio::name code, eosio::datastream<const char*> ds):
    contract(receiver, code, ds),
    profiles(receiver, receiver.value)
  {}

  [[eosio::action]] void update(eosio::name user, std::string nickname, std::string avatar,
                                std::string website, std::string locale, std::string metadata) {
    require_auth(user);

    auto iterator = profiles.find(user.value);
    if (iterator == profiles.end()) {
      // Create new
      profiles.emplace(user, [&](auto& row) {
        row.user = user;
        row.nickname = nickname;
        row.avatar = avatar;
        row.website = website;
        row.locale = locale;
        row.metadata = metadata;
      });
    } else {
      // Update existing
      profiles.modify(iterator, user, [&](auto& row) {
        row.user = user;
        row.nickname = nickname;
        row.avatar = avatar;
        row.website = website;
        row.locale = locale;
        row.metadata = metadata;
      });
    }
  }

  [[eosio::action]] void remove(eosio::name user) {
    require_auth(user);

    auto iterator = profiles.find(user.value);
    eosio::check(iterator != profiles.end(), "User doesn't have a profile");
    profiles.erase(iterator);
  }

private:
  struct [[eosio::table]] profile_entry {
    eosio::name user;
    std::string nickname;
    std::string avatar;
    std::string website;
    std::string locale;
    std::string metadata;

    uint64_t primary_key() const { return user.value; }
  };
  typedef eosio::multi_index<"profiles"_n, profile_entry> profiles_table;

  profiles_table profiles;

};

EOSIO_DISPATCH(profile, (update)(remove))
